import { useState, useEffect } from "react";
import Head from "next/head";
import { initializeApollo } from "../../lib/apolloClient"; 
/**queris to get blogposts */
import { GET_BLOGPOSTS_ADMIN,GET_BLOG_POST_BY_ID } from "../../utils/queries";
/**COMPONENT: for the blog text its integral in generating the hot links associated with the blog post*/
import BlogText from "../../components/HotLinkBlogText";
/**COMPONENT: for the bottom three page links*/
import BottomLinkPack from "../../components/BottomLinkPack";
/**COMPONENT: for the top two page links*/
import TopLinkPack from "../../components/TopLinkPack";
/**styled componenets import */
import { SingleBlogPostHeroSection,SingleBlogpostSection  } from "../../styles/Section.styled";
import { BlogHeroPic } from "../../styles/Images.styled";
import { SingleBlogpostTitle } from "../../styles/H1.styled";
/**this stuff if for the admin edit and delete buttons that will trigger the model "should probably be a COMPONENT" */
import { DeleteProductButton, EditProductButton } from '../../styles/Button.styled';
import { AdminProductBtnDiv } from '../../styles/Div.styled';
/**this stuff if for the admin edit and delete buttons that will trigger the model ending*/
/**this is imported alone for display of just this link when logged in as an admin */
import { BackSpan } from "../../styles/Spans.styled";
/**styled componenets import ends */
/**jwt auth stuff */
import auth from "../../utils/auth";
/**this is the modal for deleting and editing*/
import EditDeleteModal from "../../components/EditDeleteModal";


export async function getStaticPaths () {
    
    const client = initializeApollo();
 const {data} =  await client.query({
      query: GET_BLOGPOSTS_ADMIN
  });
const paths = data.getBlogposts.map(blogpost => {
    return {
        params: {_id: blogpost._id.toString() }
    }
})
  return {
     paths,
     fallback: false
  }
  
};

export async function getStaticProps(context) {
    const client = initializeApollo();
const _id = context.params._id;
const {data} = await client.query({
    
    query: GET_BLOG_POST_BY_ID ,variables:{_id: _id}
})
return {
    props: {blogPost: data}
}
};

export default function blogPost ({blogPost})  {
    /**destructure static props */
    const {_id,title,blogText,blogPic} = blogPost.getBlogpostById;
    /**further desstructure for pertinent blogPic info like Key Bucket which are instrumental in deleting from s3
     * all of these destructured props are used in setModalInfo();
     */
   const {Key,Bucket} = blogPic;
  /**checks to see if the user is an admin*/
  const [isAdmin,setIsAdmin] = useState(true);
  /**set admin data at runtime with useEffect*/
  useEffect(() => {
    if(auth.loggedIn()) { 
      setIsAdmin ( auth.getProfile().data.isAdmin);
      }else{
        setIsAdmin (false);
      };
  },[])

/**This IS NOT DRY "it repeats across adminproducts and homepage or index.js and now here" */

    /**this state opens edit delete modal it is passed to the modal as well as the product cards*/
    const [open, setOpen] = useState(false);
    /**modal info this state will hold the information I need to either delete or edit a product it will be set in product card
     * its passed to both modal and product card
     */
    const [modalInfo,setModalInfo] = useState({});

    /**This IS NOT DRY "it repeats across adminproducts and homepage or index.js and now here" ends*/
     const deleteBlogPost = ()=> {
        setOpen(true);
        setModalInfo({_id:_id,Bucket:Bucket,Key:Key,itemType:'blogpost',EditOrDelete:'delete'});
     };
     const editBlogPost = ()=> {
        /**when edit btn is clicked open the editDeleteModal */
        setOpen(true);
        /**set pertinant data so that the modal not only has what it needs to run operations but also so the modal will know which items its running operations for
         * in this case it will be for blogposts as determined by the "itemType" property this is going to be a recurring
         * theme for all things like users reviews products blogposts at the time of this note
         * its already being used for products
         */
        setModalInfo({_id:_id,title:title,blogText:blogText,Key:Key,Bucket:Bucket,itemType:'blogpost',EditOrDelete:'edit'});
     };



return(
    <>
    <Head>
    <meta charSet="utf-8" />
    <title>{title}</title>
    <link rel="icon" href={blogPic.Location} />
    <meta name="description" content={blogText} />
    </Head>
    <SingleBlogPostHeroSection id="Hero">
        <BlogHeroPic
        alt="the blogpost's vibe"
        src={blogPic.Location}
        />
          <SingleBlogpostTitle>{title}</SingleBlogpostTitle>
          <TopLinkPack/>
    </SingleBlogPostHeroSection>
    <SingleBlogpostSection>
        {isAdmin && <EditDeleteModal
        open={open} 
        setOpen={setOpen}
        setModalInfo={setModalInfo} 
        modalInfo={modalInfo}
        />}

          {/**Below if admin display edit and delete buttons for */}
  {isAdmin &&   <AdminProductBtnDiv><DeleteProductButton onClick={deleteBlogPost} >Delete</DeleteProductButton>
      <EditProductButton onClick={editBlogPost} >Edit</EditProductButton></AdminProductBtnDiv>}

        <BlogText content={blogText} />
      {!isAdmin && <BottomLinkPack/>}
    </SingleBlogpostSection>
    </>
);
};

/**
 import { DeleteProductButton, EditProductButton } from '../../styles/Button.styled';
import { AdminProductBtnDiv } from '../../styles/Div.styled';

        {isAdmin &&   <AdminProductBtnDiv><DeleteProductButton onClick={deleteProduct}>Delete</DeleteProductButton>
      <EditProductButton onClick={editProduct}>Edit</EditProductButton></AdminProductBtnDiv>}            
      {/*isAdmin &&   <EditProductButton>Edit</EditProductButton>*/