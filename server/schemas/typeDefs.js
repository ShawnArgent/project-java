const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
    orders: [Order]
  }

  type Category {
    _id: ID!
    name: String
  }
  type Product {
    _id: ID
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
    product: [Product]
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
    category: [Category]
    product(category: ID, _id: ID!, name: String): [Product]
    user: User
    order(_id: ID!): Order
    checkout(product: [ID]!): Checkout
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
    addOrder(product: [ID]!): Order
    updateUser(firstName: String, lastName: String, email: String, password: String): User
    updateProduct(_id: ID!, quantity: Int!): Product
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
