import { gql } from "@apollo/client";

export const ME = gql`
  query me {
    me {
      _id
      lastLogin
      username
      email
    }
  }
`;
export const QUERY_COFFEE = gql`
  query getCoffees() {
    coffees() {
      _id
      name
      roast
      type
      quantity
      price
      tastingProfile
      image
      location
      locationHistory
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($coffee: [ID]!) {
    checkout(coffees: $coffee) {
      session
    }
  }
`;

export const QUERY_ALL_COFFEE = gql`
  {
    coffee {
      _id
      name
      description
      price
      quantity
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        products {
          _id
          name
          description
          price
          quantity
          image
        }
      }
    }
  }
`;
