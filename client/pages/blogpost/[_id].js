import { initializeApollo } from "../../lib/apolloClient"; 
import { GET_BLOGPOSTS_ADMIN,GET_BLOG_POST_BY_ID } from "../../utils/queries";
import BlogText from "../../components/HotLinkBlogText";
/**styled componenets import */
import { SingleBlogPostHeroSection,SingleBlogpostSection  } from "../../styles/Section.styled";
import { BlogHeroPic } from "../../styles/Images.styled";
import { SingleBlogpostTitle } from "../../styles/H1.styled";
/**styled componenets import ends */

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
    const {_id, title,blogText,blogPic} = blogPost.getBlogpostById;
    console.log(blogPic);
    console.log(_id, title,blogText);
return(
    <>
    <SingleBlogPostHeroSection>
        <BlogHeroPic
        alt="the blogpost's vibe"
        src={blogPic.Location}
        />
          <SingleBlogpostTitle>{title}</SingleBlogpostTitle>
    </SingleBlogPostHeroSection>
    <SingleBlogpostSection>
        <BlogText content={blogText} />
    </SingleBlogpostSection>
    </>
);
};