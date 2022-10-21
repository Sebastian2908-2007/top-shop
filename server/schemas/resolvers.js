const { Category } = require('../models');

const resolvers = {
    Query:{
        getCategories: async (parent, args) => {
            return Category.find().sort({createdAt: -1});
        },
    },
};

module.exports = resolvers;