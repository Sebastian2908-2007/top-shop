const mongoose = require('mongoose');
const { Schema,model } = mongoose;
const FileUpload = require('./FileUpload');

const blogpostSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    blogText: {
        type: String,
        required: true,
        trim: true 
    },
    blogPic: {
        type: FileUpload.schema,
        required: false,
        default: () => ({
            ETag:'fake etag',
            Location: 'sybs crafty shack fake blog pic',
            key:'fake small key tag',
            Key: 'fake big Key',
            Bucket:'fake Bucket'
        }),
    }
});

const Blogpost = model('Blogpost', blogpostSchema);

module.exports = Blogpost;
