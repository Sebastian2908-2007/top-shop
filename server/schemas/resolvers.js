const { Category, FileUpload, Order, Product, Blogpost, User } = require('../models');




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
        },
        getOrders: async (parent, args) => {
            return Order.find().sort({createdAt: -1});
        },
        getBlogposts: async (parent, args) => {
            return Blogpost.find().sort({createdAt: -1});
        },
        getUsers: async (parent, args) => {
            return User.find().sort({createdAt: -1});
        },
    },
};

module.exports = resolvers;