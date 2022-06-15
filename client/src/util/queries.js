import { gql } from '@apollo/client';

export const QUERY_PRODUCT = gql`
  query getProduct {
    product {
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
`;
export const QUERY_ALL_PRODUCT = gql`
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

export const QUERY_CHECKOUT = gql`
  query getCheckout($product: [ID]!) {
    checkout(product: $product) {
      session
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
        product {
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

export const QUERY_RECIPES = gql`
  {
    recipes {
      title
      description
      ingredients
      image
    }
  }
`;
