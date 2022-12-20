import { useState, useEffect } from "react";
import Head from "next/head";
import { initializeApollo } from "../../lib/apolloClient"; 
import { GET_BLOGPOSTS_ADMIN,GET_BLOG_POST_BY_ID } from "../../utils/queries";
import BlogText from "../../components/HotLinkBlogText";
/**import link pack which is also used in main Blog page*/
import BottomLinkPack from "../../components/BottomLinkPack";
/**styled componenets import */
import { SingleBlogPostHeroSection,SingleBlogpostSection  } from "../../styles/Section.styled";
import { BlogHeroPic } from "../../styles/Images.styled";
import { SingleBlogpostTitle } from "../../styles/H1.styled";
import { SingleBlogLinkDiv } from "../../styles/Div.styled";
import TopLinkPack from "../../components/TopLinkPack";
import { DeleteProductButton, EditProductButton } from '../../styles/Button.styled';
import { AdminProductBtnDiv } from '../../styles/Div.styled';

/**styled componenets import ends */
import auth from "../../utils/auth";
import { BackSpan } from "../../styles/Spans.styled";

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
          {!isAdmin ? <TopLinkPack/>:<BackSpan>&#x2b05; Go back</BackSpan>}
    </SingleBlogPostHeroSection>
    <SingleBlogpostSection>
        
          {/**Below if admin display edit and delete buttons for */}
  {isAdmin &&   <AdminProductBtnDiv><DeleteProductButton >Delete</DeleteProductButton>
      <EditProductButton >Edit</EditProductButton></AdminProductBtnDiv>}

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