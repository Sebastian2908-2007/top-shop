import { gql } from "@apollo/client";

export const LOGIN = gql`
mutation loginUser($email:String!,$password:String!) {
    loginUser(email:$email,password:$password){
  token
    }
}
`;

export const ADD_USER = gql`
mutation addUser($firstName:String!,$lastName:String!,$email:String!,$password:String!) {
  addUser(firstName:$firstName,lastName:$lastName,email:$email,password:$password){
  token
  }
}
`;

export const ADD_CATEGORY = gql`
 mutation addCategory($name:String!) {
  addCategory(name:$name) {
    _id
    name
  }
 }
`;

export const DELETE_CATEGORY = gql`
mutation deleteCategory($_id:ID!) {
  deleteCategory(_id:$_id) {
    _id
  }
}
`;

export const ADD_FILE = gql`
mutation addFile($ETag:String!,$Location:String!,$key:String,$Key:String!,$Bucket:String!) {
  addFile(ETag:$ETag,Location:$Location,key:$key,Key:$Key,Bucket:$Bucket) {
    _id
  }
}
`;

export const ADD_PRODUCT = gql`
mutation addProduct($name:String!,$description:String!,$image:ID!,$price:Int!,$quantity:Int,$category:ID!) {
  addProduct(name:$name,description:$description,image:$image,price:$price,quantity:$quantity,category:$category) {
    _id
 }
}
`;

/**used in EditDeleteModal.js */
export const DELETE_PRODUCT = gql`
mutation deleteProduct($_id:ID!) {
  deleteProduct(_id:$_id) {
    _id
  }
}
`;
export const EDIT_PRODUCT = gql`
mutation updateProduct($_id:ID!,$name:String,$description:String,$price:Int,$quantity:Int) {
  updateProduct(_id:$_id,name:$name,description:$description,price:$price,quantity:$quantity) {
    _id
  }
}
`;
/**used in EditDeleteModal.js */

/**add blogpost mutation*/
export const ADD_BLOGPOST = gql`
mutation addBlogpost($title:String!,$blogText:String!,$blogPic:ID!) {
  addBlogpost(title:$title,blogText:$blogText,blogPic:$blogPic) {
    blogText
    title
    blogPic {
     _id
    }
  }
}`;

/**mutation to delete single blogpost its first use is in the [_id].js file in the blogpost dir inside pages dir */
export const DELETE_BLOGPOST = gql`
mutation deleteBlogpost($_id:ID!) {
  deleteBlogpost(_id: $_id) {
    _id
  }
}
`;
/**mutation to edit a blogPost*/
export const EDIT_BLOG_POST = gql`
mutation updateBlogpost($_id:ID!,$title:String,$blogText:String,$blogPic:ID) {
  updateBlogpost(_id: $_id,title:$title,blogText:$blogText,blogPic:$blogPic) {
    _id
    title
    blogPic {
      _id
    }
    
  }
}
`;

/**add review mutation for leave review form a.k.a AddReview.js*/
export const ADD_REVIEW = gql`
mutation addReview($reviewText:String!,$rating:Int!) {
  addReview(reviewText:$reviewText,rating:$rating) {
     _id
    reviewText
    rating
    author {
      _id
      
    }
  }
  }
`;

/**mutation to delete review*/
export const DELETE_REVIEW = gql`
mutation deleteReview($_id:ID!) {
  deleteReview(_id:$_id) {
    _id
  }
}
`;

/**mutation to edit a review*/
export const EDIT_REVIEW = gql`
mutation updateReview($_id:ID!,$reviewText:String!,$rating:Int!) {
  updateReview(_id:$_id,reviewText:$reviewText,rating:$rating) {
    rating
    reviewText
    author {
      _id
    }
  }
}
`;
/**used for admin to delete user*/
export const DELETE_USER = gql`
mutation deleteUser($_id:ID){
  deleteUser(_id:$_id) {
    _id
  }
}
`;

/**mutation for an admin to update a user "edit user"*/
export const ADMIN_EDIT_USER = gql`
mutation AdminUpdateUser ($_id:ID!,$firstName:String,$lastName:String,$email:String){
  AdminUpdateUser(_id:$_id,firstName:$firstName,lastName:$lastName,email:$email) {
    firstName
    lastName
    email
  }
}
`;

/**this is used to add an order on the success page*/
export const ADD_ORDER = gql`
mutation addOrder($products:[ID!]) {
  addOrder(products:$products) {
    purchaseDate
  }
}
`;