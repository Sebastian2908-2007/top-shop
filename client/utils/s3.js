// import just s3 from aws-sdk
const S3 = require('aws-sdk/clients/s3');

//this will determine which mimeType we should set for s3
// A.K.A Content-Type
const determineMimeType = (file) => {
    // get file extension off the filename
    const extension = file.name.split('.')[1];
    // throw error if the file has an mkv extension
    if(extension === 'mkv') { 
        return Error('incorrect file type').message;
    };
    if(extension === 'JPG' || extension === 'jpeg') {
        return 'image/jpeg';
    };
    if(extension === 'png' || extension === 'PNG') {
        return 'image/png';
    };
    if(extension === 'mp4' || extension === 'MP4') {
        return 'video/mp4';
    };
};
// create variables from .env s3 information
const bucketName = process.env.NEXT_PUBLIC_AWS_BUCKET_NAME;
// the bottom three are used in the s3 instance
const region = process.env.NEXT_PUBLIC_AWS_BUCKET_REGION;
const accessKeyId = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY;
const secretAccessKey = process.env.NEXT_PUBLIC_AWS_SECRET_KEY;


// my s3 instance
const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey

})

// this will upload a file to my S3 bucket
export function s3Upload(file) {
   // check to see if there is actually a file if not return an error
   if(file === null) {
    return Error('no file submitted').message;
   }
   const mimeType = determineMimeType(file);
   // error handling if someone uploads an mkv
   if(mimeType === 'incorrect file type') {
    return Error('incorrect file type').message;
   }
    const uploadParams = {
        Bucket: bucketName,
        Body: file,
        Key: file.name,
        // content type will be set to whatever returns from determineMimeType function
        ContentType: mimeType
    }
    return s3.upload(uploadParams).promise();
  
};

// this will delete objects from my s3 bucket 

export function s3Delete(Bucket,Key) {
    /*this will handle when a user initially changes their profile pic with dummy data,
    keeping the function from running all the way through and throwing an error */
    if(Bucket === 'fake Bucket' && Key === 'fake Key') {
        return;
    }

   const deleteParams = {
    Bucket: Bucket,
    Key: Key
   };

   s3.deleteObject(deleteParams,function(err, data) {
    if(err) {
        console.log('This is an S3 delete error',err, err.stack);
    }else {
        console.log('The delete was successfull S3 delete',data)
    }
   });
};