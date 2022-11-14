import { gql } from "@apollo/client";

export const GET_ALL_PRODUCTS_HOMEPAGE = gql`
   query getProducts{
  getProducts {
    _id
    name
    description
    image {
      Location
    }
    price
    quantity
  }
}
`;