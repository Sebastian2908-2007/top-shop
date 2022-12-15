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

/**blogpost wuery used to display number of blogposts in admin dash*/
export const GET_BLOGPOSTS_ADMIN = gql`
query getBlogposts {
  getBlogposts {
    _id
  }
}
`;
/**this query will get blogposts and return all the data about them so 
 * this will be used on main blogposts page
 */
export const GET_BLOGPOSTS_ALL_DATA = gql`
query getBlogposts {
  getBlogposts {
    _id
    title
    blogText
    blogPic {
      _id
      ETag
      Location
      key
      Key
      Location
    }
  }
}
`;
