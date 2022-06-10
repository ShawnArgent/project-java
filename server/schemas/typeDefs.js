const { gql } = require("apollo-server-express");

const typeDefs = gql`
  "Unix time stamp in milliseconds."
  scalar Date

  type User {
    _id: ID!
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Coffee {
    _id: ID!
    name: String
    roast: String
    type: String
    quantity: Int
    price: Float
    tastingProfile: String
    image: String
    location: String
    locationHistory: String
  }

  type Order {
    _id: ID!
    purchaseDate: String
    coffees: [Coffee]
  }

  type Recipe {
    _id: ID!
    title: String
    description: String
    ingredients: [String]
    image: String
  }

  type Checkout {
    session: ID
  }

  type Auth {
    token: String!
    user: User!
  }

  type Query {
    "Find the logged in user."
    me: User
    coffees: [Coffee]
    coffee(_id: ID!): Coffee
    checkout(coffees: [ID]!): Checkout
    recipes: [Recipe]
  }

  type Mutation {
    createUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    newOrder(coffees: [ID]!): Order
    updateCoffee(_id: ID!, quantity: Int!): Coffee
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
