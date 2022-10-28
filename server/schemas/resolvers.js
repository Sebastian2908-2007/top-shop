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
            return await User.find().populate('review').sort({createdAt: -1});
        },
        getUserById: async (parent,{_id}) => {
            return await User.findOne({_id:_id});
        },
        getReviews: async  (parent,args) => {
            return await Review.find().populate('author').sort({createdAt: -1});
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
        deleteUser: async (parent,{_id},context) => {
          // if(context.user._id === _id) {
            const user = await User.findById(_id);
            console.log(user);
                const deletedUser = await User.findOneAndDelete({_id:_id});
                return deletedUser;
           // }
           // throw new AuthenticationError('it must actually be you account to delete!');
        },
        addReview: async (parent,{reviewText,rating},context) => {
            const currentUser = await User.findOne({_id:context.user._id});
           if(currentUser.hasLeftReview === false) {
                const usersReview = await Review.create(
                    {        
                    reviewText: reviewText,
                    rating: rating,
                    author: context.user._id
                } 
                );
                await User.findByIdAndUpdate(
                    {_id: context.user._id},
                    {
                    hasLeftReview: true,
                    review: usersReview
                   },
                   {new:true}  
                );
                return usersReview;
            }
            throw new AuthenticationError('looks like you have already left a review!');
        },
        deleteReview: async (parent,{_id}) => {
            const deletedReview = await Review.findOneAndDelete({_id:_id});
            return deletedReview;
        },
    }
};

module.exports = resolvers;