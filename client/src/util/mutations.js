import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation addOrder($product: [ID]!) {
    addOrder(product: $product) {
      purchaseDate
      product {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation addUser($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    addUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
