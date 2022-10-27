const { AuthenticationError } = require('apollo-server-express');
const { Category, FileUpload, Order, Product, Blogpost, User, Review } = require('../models');
const { signToken } = require('../utils/authorize');




const resolvers = {
    Query:{
        getCategories: async (parent, args) => {
            return await Category.find().sort({createdAt: -1});
        },
        getFiles: async (parent, args) => {
            return await FileUpload.find().sort({createdAt: -1});
        },
        getProducts: async (parent,args) => {
            return await Product.find().sort({createdAt: -1});
        },
        getOrders: async (parent, args) => {
            return await Order.find().sort({createdAt: -1});
        },
        getBlogposts: async (parent, args) => {
            return await Blogpost.find().sort({createdAt: -1});
        },
        getUsers: async (parent, args) => {
            return await User.find().sort({createdAt: -1});
        },
        getReviews: async  (parent,args) => {
            return await Review.find().populate('User').sort({createdAt: -1});
        },
    },
    Mutation: {
        addUser: async (parent,args) => {
            const user = await User.create(args);
            const token = signToken(user);
            return {user, token};
        },
        loginUser: async (parent,{email,password}) => {
            const user = await User.findOne({ email });
            if(!user) {
                throw new AuthenticationError('incorrect credentials');
            }
            const correctPassword = await user.isPasswordCorrect(password);
            if(!correctPassword) {
                throw new AuthenticationError('incorrect credentials')
            }
            const token = signToken(user);
            return { user,token };
        },
        updateUser: async (parent,{firstName,lastName,email},context) => {
            if(context.user) {
                const id = context.user._id;
                const updatedUser = await User.findByIdAndUpdate(
                    {_id: id},
                    {
                        firstName: firstName,
                        lastName: lastName,
                        email: email
                    },
                    { new: true, runValidators: true }
                );
              return updatedUser;
            }
            throw new AuthenticationError('no permissions');
        },
    }
};

module.exports = resolvers;