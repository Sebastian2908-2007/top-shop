import { gql } from "@apollo/client";

/**product related queries*/
export const GET_ALL_PRODUCTS= gql`
   query getProducts{
  getProducts {
    _id
    name
    description
    category{
      _id
      name
    }
    image {
      Location
      Bucket
      Key
    }
    price
    quantity
  }
}
`;


/**this get all products query is used in the admin dashboard add product section its soul purpose
 * is to basically provide a count of all products in a link that can be clicked and routed to a new page
 * with all of the products
 */
export const GET_PRODUCTS_FOR_ADMIN_LINK = gql`
 query getProducts{
  getProducts {
    _id
  }
 }
`;
/**product related queries end********************************/

export const GET_CATEGORIES = gql`
query getCategories {
  getCategories {
    _id
    name
  }
}
`;

