import { useEffect } from "react";
/**material ui */
import { Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
/**material ui ends*/
import { BlogPreviewTitle} from "../styles/H1.styled";
import { FullBlogPostLink } from "../styles/Links.styled";
import { ContinueReadSpan } from "../styles/Spans.styled";
import { CardImageDiv } from "../styles/Div.styled";
import Image from 'next/legacy/image';
const BlogPostPrieviewCard = ({blogPost}) => {
    const {_id,title,blogText,blogPic} = blogPost;
    return(
        <Card sx={{ 
            boxShadow:' 0 0 10px black',
            height:'100%',
            maxWidth: '100%',
            //backgroundColor: "rgb(255,255,255,0.6)",
            background: 'linear-gradient(to left, rgb(0, 119, 255),rgb(0,0,0,0.7))',
            border: '1px solid black'}}>
            {/*<CardMedia
               component="img"
               alt={title}
               height="140"
               image={blogPic.Location}
            />*/}
            <div>
             <Image
         src={blogPic.Location}
         alt={title}
         width={600}
         height={600}
         layout='responsive'
             />
             </div>
            <CardContent sx={{display:'flex',flexDirection:'column',alignItems:'center'}}>
        <BlogPreviewTitle>{title}</BlogPreviewTitle>
        {/**blogtext toSubstring just sets how many chars from blogtext appear in the preview */}
      <FullBlogPostLink href={`/blogpost/${_id}`}> <div>{blogText.substring(0,32)}<ContinueReadSpan>. . .Continue Reading</ContinueReadSpan></div> </FullBlogPostLink>
           </CardContent>
        </Card>
    );
};

export default BlogPostPrieviewCard;