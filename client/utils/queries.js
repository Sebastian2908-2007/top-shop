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
      _id
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
/**get blogpost by _id used on single blogpost page */
export const GET_BLOG_POST_BY_ID = gql`
query getBlogpostById($_id:ID!) {
  getBlogpostById(_id: $_id) {
    _id
    title
    blogText
    blogPic {
      _id
      ETag
      Bucket
      Location
      key
      Key
    }
  }
}
`;

/**get all reviews query for review page*/
export const GET_REVIEWS = gql`
query getReviews {
  getReviews {
    _id
    reviewText
    rating
    author {
      _id
      email
      lastName
      firstName
      hasLeftReview
    }

  }
}
`;
/**get all reviews query for adminPage review section page*/
export const GET_REVIEWS_FOR_ADMIN = gql`
query getReviews {
  getReviews {
    _id
  }
}
`;

/**get user related query for admin functionalities*/
export const GET_BASIC_USERS = gql`
query getUsers{
  getUsers {
    _id
  }
}
`;
export const GET_ALL_DATA_USERS = gql`
query getUsers{
  getUsers {
    _id
    firstName
    lastName
    email
    password
    isAdmin
    hasLeftReview
    review {
      _id
      rating
      reviewText
    }
    orders {
      _id
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          _id
          name
        }
      }
    }
  }
}
`;
/**query to get single user by _id used in userdetails page*/
export const GET_USER_BY_ID = gql` 
query getUserById($_id:ID!) {
  getUserById(_id:$_id) {
     _id
    firstName
    lastName
    email
    password
    isAdmin
    hasLeftReview
    review {
      _id
      reviewText
      rating
    }
    orders {
      _id
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          _id
          name
        }
        image {
          Location
        }
      }
    }
   }   
  }`;
  /**query for checking out */
  export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

/**query to get single user by _id used in addresscheckout page*/
export const GET_USER_ADDRESS_FOR_CHECKOUT = gql` 
query getUserById($_id:ID!) {
  getUserById(_id:$_id) {
    address{
      _id
      streetAddress
      country
      city
      zip
      state
    }
   }   
  }`;