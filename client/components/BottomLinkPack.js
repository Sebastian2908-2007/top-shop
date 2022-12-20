import Router from 'next/router';
import { SingleBlogLinkDiv } from "../styles/Div.styled";
import { BackToTopLink, ShopNowLink } from "../styles/Links.styled";
import { BackSpan } from "../styles/Spans.styled";

const LinkPack = () => {
    return (
        <SingleBlogLinkDiv 
        padding='2%' marginTop="4rem"
        borderRadius="8px"background='linear-gradient(to right, rgb(199, 197, 104),rgb(0,0,0,0.7));'>
        <BackSpan  onClick={() => Router.back()}>&#x2b05; Go Back</BackSpan>
        <BackToTopLink href="#Hero">Back To Top</BackToTopLink>
        <ShopNowLink href='/'>Shop Now</ShopNowLink>
        </SingleBlogLinkDiv>
    );
};

export default LinkPack;