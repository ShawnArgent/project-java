const { gql } = require('apollo-server-express');

const typeDefs = gql`
  "Unix time stamp in milliseconds."
  scalar Date

  type User {
    _id: ID
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
    _id: ID
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
    token: String
    user: User
  }

  type Query {
    coffees(category: ID, name: String): [Coffee]
    coffee(_id: ID!): Coffee
    me: User
    checkout(coffees: [ID]!): Checkout
    recipes: [Recipe]
  }

  type Mutation {
    createUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    newOrder(coffees: [ID]!): Order
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;