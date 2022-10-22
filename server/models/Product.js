const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const FileUpload = require('./FileUpload');

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: FileUpload.schema,
        required: false,
        default:() => ({
            ETag: 'fake etag',
            Location: 'fake location',
            key:'fake small key',
            Key:'fake big key',
            Bucket:'fake Bucket'
        }),
    },
    price:{
        type: Number,
        required: true,
        min:0.99
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    category: {
        type: Schema.Types.ObjectId,
        ref:'Category',
        required: true
    }
});

const Product = model('Product', productSchema);

module.exports = Product;