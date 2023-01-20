import { useQuery } from "@apollo/client";
import BlogPostPrieviewCard from "../components/BlogPostPrieviewCard";
import { GET_BLOGPOSTS_ALL_DATA } from "../utils/queries";
/**styled component imports */
import { BlogpostSection } from "../styles/Section.styled";
import { NoProductDiv } from "../styles/Div.styled";
/**styled component imports end*/
/**mui imports */
import Grid from '@mui/material/Grid';
/**mui imports ends*/
/**styled components imports*/
import { BlogPostHeroSection } from "../styles/Section.styled";
import {  BlogHeroPic } from "../styles/Images.styled";
import { MainTitle } from "../styles/H1.styled";
/**styled components imports ends*/
import BottomLinkPack from "../components/BottomLinkPack";
import TopLinkPack from "../components/TopLinkPack";
const Blog = () => {
    
    const {loading,data} = useQuery(GET_BLOGPOSTS_ALL_DATA);
    if(loading) {
        return (<div>loading...</div>);
    }
    const blogPosts = data.getBlogposts;
    //console.log(blogPosts);
    
return(
    <div>
        <BlogPostHeroSection id="Hero">
<BlogHeroPic
src="/topshop-hero1.png"
alt="hero banner of a cute handmade knome in a jail suit"
/>
<MainTitle>Top Blog</MainTitle>
<TopLinkPack/>
        </BlogPostHeroSection>
    <BlogpostSection>
       <Grid container rowSpacing={{xs:3,md:4}} columnSpacing={{xs:0,sm:4,md:4}}>
        { blogPosts.length ? (blogPosts.map(blogPost => (
            <Grid item xs={12} sm={6} lg={4} xl={3}  key={blogPost._id} >
            <BlogPostPrieviewCard blogPost={blogPost}/>
            </Grid>
        ))):(<NoProductDiv>no blog posts 😭</NoProductDiv>)}
        </Grid>
        <BottomLinkPack/>
    </BlogpostSection>
    </div>
)
};

/**use getStaticProps for non dynamic routes */
/*export async function getStaticProps () {
    const client = initializeApollo();
 const {data} =  await client.query({
      query: GET_BLOGPOSTS_ADMIN
  });
  console.log(data);
  return {
    props: {
        blogPostId: data.getBlogposts
    }
}
};
*/
export default Blog;