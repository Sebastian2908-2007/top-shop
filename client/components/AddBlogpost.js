import { useEffect, useState } from "react";
import { useQuery,useMutation } from "@apollo/client";
/**below query will be used to get number of blogposts it only returns _id's */
import { GET_BLOGPOSTS_ADMIN } from "../utils/queries";
/**add blogpost mutations*/
import { ADD_FILE, ADD_BLOGPOST } from "../utils/mutations";
/*styled components imports*/
import { AdminForm, AdminFormInput, AdminFormButton,AdminTextArea } from "../styles/Forms.styled";
import { AdminSectionTitle } from "../styles/H2.styled";
import { CarouselAdminSection } from "../styles/Section.styled";
import { AdminBlogpostLink } from "../styles/Links.styled";
/*styled components imports ends*/
/**import s3 upload function to upload blog pics*/
import { s3Upload } from "../utils/s3";

const AddBlogpost = () => {
    /**this query is used to display number of blogposts in the AdminBlogpostLink at bottom of component*/
    const {loading, data: getBlogpostCount,refetch} = useQuery(GET_BLOGPOSTS_ADMIN);
    /**mutations to upload a blogpost*/
    const [addBlogPic] = useMutation(ADD_FILE);
    const [addBlogPost] = useMutation(ADD_BLOGPOST);
    /**state of form fields */
    const [blogPostData,setBlogPostData] = useState({title:'',blogText:''});
    const [blogPic,setBlogPic] = useState(null);
    /**change function to keep track of text fields */
    const handleFormChange = event => {
        const {name,value} = event.target;
        setBlogPostData({
            ...blogPostData,
            [name]: value
        });
        console.log(blogPostData);
    };
    /**this is used to capture the file or picture from form*/
    const handleFileChange = event => {
        setBlogPic(event.target.files[0]);
    };
    /*this function submits the blogpost form*/
    const submitForm = async event => {
        event.preventDefault();
        try {
            /**upload blogpic to s3*/
       const s3ReturnData = await s3Upload(blogPic);
       /**upload blogpic info to our db*/
       const blogPicData = await addBlogPic({
        variables:{
            ETag: s3ReturnData.ETag,
            Location:s3ReturnData.Location,
            key:s3ReturnData.key,
            Key:s3ReturnData.Key,
            Bucket:s3ReturnData.Bucket
        }
       });
       /**get blogpic _id from data returned from our db*/
       const blogPicId = blogPicData.data.addFile._id;

       const blogPostUpload = await addBlogPost({
        variables: {
            title: blogPostData.title,
            blogText: blogPostData.blogText,
            blogPic: blogPicId
        }
       });
console.log(blogPostUpload);
 /**this will reset the product form*/
 document.getElementById('blogpost-form').reset();
 setBlogPic(null);
 setBlogPostData({title:'',blogText:''});
 refetch();

        }catch(e){
            console.log(e);
        };
        
    };
    
    return( 
   <CarouselAdminSection>
    <AdminSectionTitle>Create Blog Post</AdminSectionTitle>
    <AdminForm id="blogpost-form" onSubmit={submitForm} height='50%'>
        <AdminFormInput onChange={handleFormChange} name="title" placeholder="Blog Post Title" type='text'/>
        <AdminTextArea onChange={handleFormChange}  name="blogText" placeholder="Blog Post Text"/>
        <AdminFormInput onChange={handleFileChange} name="blogPic" type="file" accept='/image'/>
        <AdminFormButton type="submit">Submit</AdminFormButton>
    </AdminForm>
    <AdminBlogpostLink href='/blog'>There are {loading ? 'loading': getBlogpostCount.getBlogposts.length} blogposts ➯</AdminBlogpostLink>
   </CarouselAdminSection>
    );
};

export default AddBlogpost;