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

type Query {
    getCategories:[Category]
    getFiles:[FileUpload]
}
`;

module.exports = typeDefs;