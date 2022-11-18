import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS_HOMEPAGE = gql`
   query getProducts{
  getProducts {
    _id
    name
    description
    category{
      _id
    }
    image {
      Location
    }
    price
    quantity
  }
}
`;

export const GET_CATEGORIES = gql`
query getCategories {
  getCategories {
    _id
    name
  }
}
`;