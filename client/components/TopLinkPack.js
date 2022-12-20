import { BlogLinkDiv } from "../styles/Div.styled";
import { ShopNowLink } from "../styles/Links.styled";
import { BackSpan } from "../styles/Spans.styled";

const TopLinkPack = () => {
    return (
        <BlogLinkDiv>
        <BackSpan  onClick={() => Router.back()}>&#x2b05; Go Back</BackSpan>
        <ShopNowLink href='/'>Shop Now</ShopNowLink>
        </BlogLinkDiv>
    );
};

export default TopLinkPack;