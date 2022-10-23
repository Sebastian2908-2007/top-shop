const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Category {
    _id: ID
    name: String
}
 type FileUpload {
    _id: ID
    ETag: String!
    Location: String!
    key: String
    Key: String!
    Bucket: String!
 }
 type Product {
    _id: ID
    name: String !
    description: String !
    image: FileUpload
    price: Int !
    quantity: Int ! 
    category: Category !
 }

 type Order {
    _id: ID
    purchaseDate: String
    products:[Product]
 }

 type Blogpost {
    _id: ID
    title: String,
    blogText: String
    blogPic: FileUpload
 }
 type User {
   _id: ID
   firstName: String
   lastName: String
   email: String
   password: String
   isAdmin: Boolean
   orders:[Order]
 }

type Query {
    getCategories:[Category]
    getFiles:[FileUpload]
    getProducts:[Product]
    getOrders:[Order]
    getBlogposts:[Blogpost]
    getUsers:[User]
}
`;

module.exports = typeDefs;