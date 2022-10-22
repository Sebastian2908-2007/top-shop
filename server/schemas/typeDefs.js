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
    name: String 
    description: String
    image: FileUpload
    price: Int 
    quantity: Int 
    category: Category
 }

type Query {
    getCategories:[Category]
    getFiles:[FileUpload]
    getProducts:[Product]
}
`;

module.exports = typeDefs;