import { gql } from "@apollo/client";
import { initializeApollo } from "../../lib/apolloClient"; 
import { GET_BLOGPOSTS_ADMIN,GET_BLOG_POST_BY_ID } from "../../utils/queries";

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
    const {_id, title,blogText} = blogPost.getBlogpostById;
    console.log(blogPost);
    console.log(_id, title,blogText);
return(
    <div>
        <h1>{title}</h1>
        <p>{blogText}</p>
    </div>
);
};