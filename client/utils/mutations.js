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