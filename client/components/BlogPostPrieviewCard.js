import { useEffect } from "react";
/**material ui */
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
/**material ui ends*/
import { MainTitle } from "../styles/H1.styled";
import { FullBlogPostLink } from "../styles/Links.styled";
const BlogPostPrieviewCard = ({blogPost}) => {
    const {_id,title,blogText,blogPic} = blogPost;
   // console.log(_id,title,blogText);
   // console.log(blogPic);
   useEffect(() => {console.log('main blog rendering')},[])
    return(
        <Card>
            <CardMedia
               component="img"
               alt={title}
               height="140"
               image={blogPic.Location}
            />
            <CardContent sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <MainTitle>{title}</MainTitle>
      <FullBlogPostLink href={`/blogpost/${_id}`}> <div>{blogText.substring(0,32)}...</div> </FullBlogPostLink>
           </CardContent>
        </Card>
    );
};

export default BlogPostPrieviewCard;