const { Category, FileUpload } = require('../models');
const Product = require('../models/Product');

const resolvers = {
    Query:{
        getCategories: async (parent, args) => {
            return Category.find().sort({createdAt: -1});
        },
        getFiles: async (parent, args) => {
            return FileUpload.find().sort({createdAt: -1});
        },
        getProducts: async (parent,args) => {
            return Product.find().sort({createdAt: -1});
        }
    },
};

module.exports = resolvers;