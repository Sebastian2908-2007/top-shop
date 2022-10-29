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
            return await User.findOne({_id:_id}).populate('review');
        },
        getReviews: async  (parent,args) => {
            return await Review.find().populate('author').sort({createdAt: -1});
        },
        getReviewById: async (parent,{_id}) => {
            return await Review.findOne({_id:_id}).populate('author');
        },
        getCategoryById: async (parent,{_id}) => {
            return await Category.findOne({_id:_id});
        },
        getFileById: async (parent,{_id}) => {
            return await FileUpload.findOne({_id:_id});
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
           if(context.user._id === _id) {
            const user = await User.findById(_id);
            if(user.hasLeftReview === true){
            try{
                await Review.findByIdAndDelete(user.review._id);
                const deletedUser = await User.findOneAndDelete({_id:_id});
                console.log('deleting user and review block ran');
                return deletedUser;
            }catch(e) {
                console.log('delete review and user block',e);
             }
            }
               try{
                const deletedUser = await User.findOneAndDelete({_id:_id});
                console.log('only deleting user block ran');
                return deletedUser;
               }catch(e) {
                console.log('only delete user block',e);
               }
        
            }
           throw new AuthenticationError('it must actually be you account to delete!');
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
        deleteReview: async (parent,{_id},context) => {
            /*find review thats fed in to mutation*/
            const review = await Review.findById(_id);
            /*get author's id from the found review*/
            const author = review.author.toHexString();
            /*here we compare author id to the current users id if they match delete review if not throw error */
            if(author === context.user._id ) {
            const deletedReview = await Review.findOneAndDelete({_id:_id});
            try{await User.findByIdAndUpdate({_id:context.user._id},{hasLeftReview:false},{new:true});}
            catch(e){
                console.log('update user fail review delete',e);
            }
            return deletedReview;
            }
            throw new AuthenticationError('you must have made the review to delete it!')
        },
        updateReview: async (parent,{_id,reviewText,rating},context) => {
              /*find review thats fed in to mutation*/
              const review = await Review.findById(_id);
              /*get author's id from the found review*/
            const author = review.author.toHexString();
            const currentUser = context.user._id;
            console.log(author);
            console.log(currentUser);
            if(author === currentUser) {
                try {
                const updatedReview = await Review.findByIdAndUpdate(
                    {_id: _id},
                    {
                        reviewText: reviewText,
                        rating: rating
                    },
                    {new:true} 
                );
                return updatedReview;
                }catch(e) {
                    console.log(e);
                }
            }
          throw new AuthenticationError('to edit a review you must have created it and be logged in!');
        },
        addCategory: async (parent,args,context) => {
            if(context.user.isAdmin) {
                return await Category.create(args);
            }
            throw new AuthenticationError('you must be an admin to create a new category');
        },
        updateCategory: async (parent,args,context) => {
            if(context.user.isAdmin) {
                return await Category.findByIdAndUpdate(
                    {_id: args._id},
                    {name: args.name},
                    {new:true}
                );
            }
            throw new AuthenticationError('you must be an admin to update a category!');
        },
        deleteCategory: async (parent,args,context) => {
            if(context.user.isAdmin) {
                return await Category.findByIdAndDelete(args._id);
            }
            throw new AuthenticationError('you must be an admin to delete a category');
        },
        addFile: async (parent,args) => {
         try{ 
            return await FileUpload.create(args);
         }catch(e) {
            console.log(e);
         }
        },
        deleteFile: async (parent,{_id}) => {
            try{
            return FileUpload.findByIdAndDelete({_id:_id});
            }catch(e) {
                console.log(e);
            }
        },
    }
};

module.exports = resolvers;