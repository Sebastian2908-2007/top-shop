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