import { gql } from '@apollo/client';

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
export const QUERY_PRODUCT = gql`
  query getCoffees {
    products {
      _id
      name
      type
      quantity
      price
      tastingProfile
      image
      location
      locationHistory
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(productss: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCT = gql`
  {
    products {
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
`;

export const QUERY_CATEGORY = gql`
  {
    category {
      _id
      name
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
