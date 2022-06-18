const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { User, Coffee, Category, Order, Recipe } = require('../models');
const { signToken } = require('../util/auth');
const { SERVER_API_KEY } = process.env;

// remove sk test code and make secret
const stripe = require('stripe')(SERVER_API_KEY);

const resolvers = {
  Query: {
    categories: async () => {
      return await Category.find();
    },
    coffees: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Coffee.find(params).populate('category');
    },
    coffee: async (parent, { _id }) => {
      return await Coffee.findById(_id).populate('category');
    },
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.coffees',
          populate: 'category',
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError('Not logged in');
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: 'orders.coffees',
          populate: 'category',
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError('Not logged in');
    },
    checkout: async (parent, args, context) => {
      const url = new URL(context.headers.referer).origin;
      const order = new Order({ coffees: args.coffees });
      const { coffees } = await order.populate('coffees').execPopulate();
      const line_items = [];

      for (let i = 0; i < c0ffees.length; i++) {
        // generate coffee id
        const coffee = await stripe.coffees.create({
          name: coffees[i].name,
          description: coffees[i].description,
          images: [`${url}/images/${coffees[i].image}`],
        });

        // generate price id using the coffee id
        const price = await stripe.prices.create({
          coffee: cofee.id,
          unit_amount: coffees[i].price * 100,
          currency: 'usd',
        });

        // add price id to the line items array
        line_items.push({
          price: price.id,
          quantity: 1,
        });
      }

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items,
        mode: 'payment',
        success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${url}/`,
      });

      return { session: session.id };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    addOrder: async (parent, { coffees }, context) => {
      if (context.user) {
        const order = new Order({ coffees });

        await User.findByIdAndUpdate(context.user._id, { $push: { orders: order } });

        return order;
      }

      throw new AuthenticationError('Not logged in');
    },
    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }

      throw new AuthenticationError('Not logged in');
    },
    updateCoffees: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Coffee.findByIdAndUpdate(_id, { $inc: { quantity: decrement } }, { new: true });
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);

      return { token, user };
    },
  },
};

module.exports = resolvers;
