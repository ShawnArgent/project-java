const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const { User, Coffee, Order, Recipe } = require("../models");
const { signToken } = require("../util/auth");
const { dateScalar } = require("./customScalars");
const { SERVER_API_KEY } = process.env;

// remove sk test code and make secret
const stripe = require("stripe")(SERVER_API_KEY);

const resolvers = {
  Date: dateScalar,
  Query: {
    me: async (parent, args, ctx) => {
      // if ctx.user is undefined, then no token or an invalid token was
      // provided by the client.
      if (!ctx.user) {
        throw new AuthenticationError("Must be logged in.");
      }
      return User.findOne({ email: ctx.user.email });
    },

    coffees: async (parent, { category, name }) => {
      return await Coffee.find();
    },

    coffee: async (parent, { _id }) => {
      return await Coffee.findById(_id);
    },

    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ coffees: args.coffees });
      const line_items = [];

      const { coffees } = await order.populate("coffees");

      for (let i = 0; i < coffees.length; i++) {
        const coffee = await stripe.coffees.create({
          name: coffees[i].name,
          roast: coffees[i].roast,
          type: coffees[i].type,
          images: [`${url}/images/${coffees[i].image}`],
        });

        const price = await stripe.prices.create({
          coffee: coffee.id,
          unit_amount: coffees[i].price * 100,
          currency: "usd",
        });

        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items,
        mode: "payment",
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },

    recipes: async () => {
      return await Recipe.find();
    },
  },
  Mutation: {
    createUser: async (parent, args) => {
      try {
        const user = await User.create({ ...args });
        const token = await signToken(user);
        return { user, token };
      } catch (error) {
        if (error.name === "MongoError" && error.code === 11000) {
          const [[key, value]] = Object.entries(error.keyValue);
          throw new UserInputError(`${key} "${value}" already exists.`);
        }
        throw error;
      }
    },

    newOrder: async (parent, { coffees }, context) => {
      if (context.user) {
        const order = await Order.create({ coffees });
        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });
        return order;
      }

      throw new AuthenticationError("Not logged in");
    },

    login: async (parent, args) => {
      const { email, password } = args;
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Invalid username or password");
      }
      const authentic = await user.isCorrectPassword(password);
      if (!authentic) {
        throw new AuthenticationError("Invalid username or password");
      }
      const token = await signToken(user);
      user.lastLogin = Date.now();
      await user.save();
      return { token, user };
    },
  },
};

module.exports = resolvers;
