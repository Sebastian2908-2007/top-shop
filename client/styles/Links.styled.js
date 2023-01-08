import styled from 'styled-components';
import Link from 'next/link';

export const HeaderHomePageLink = styled(Link)`
padding: 1.5%;
`;

export const SocialImgLink = styled.a`
text-decoration: none;
width: 45%;
display: flex;
justify-content: center;
background-color: rgb(0, 119, 255);
border-radius: 30%;
`;

export const AdminDashboardLink = styled(Link)`
color: orange;
padding: 2%;
text-shadow: 0 0 1px black ;
&:hover {
color: black;
}
`;
export const UserOrdersLink = styled(Link)`
color: orange;
padding: 2%;
text-shadow: 0 0 1px black ;
&:hover {
color: black;
}
`;

export const AdminProductLink = styled(Link)`
text-align: center;
color: rgb(245 245 6);
text-decoration: underline;
margin-top: 11%;
&:hover {
//color:rgb(248, 248, 128);
color: rgb(255, 0, 0);
}
`;
export const AdminBlogpostLink = styled(Link)`
text-align: center;
color: rgb(245 245 6);
text-decoration: underline;
margin-top: 11%;
&:hover {
    color: rgb(255, 0, 0);
//color:rgb(248, 248, 128);
}
`;

export const FullBlogPostLink = styled(Link)`
background: linear-gradient(to right, rgb(254, 114, 53),rgb(0,0,0));;
padding: 3%;
border-radius: 11px;
color: rgb(254, 167, 53);
&:hover {
//background-color: rgb(255,255,255,0.8);
background: linear-gradient(to left, rgb(199, 197, 104),rgb(0,0,0));;
}
`;

export const ExternalLink = styled.a`
color: #017698;
text-decoration: underline;
&:hover {
color:rgb(248, 248, 128);
background-color: black;
border-radius: 8px;
padding: .5%;
}
`;

export const ShopNowLink = styled(Link)`
color:rgb(0, 195, 255);
background-color: rgb(254, 114, 53);
border-radius: 8px;
padding: .4%;
border: 2px solid rgb(0, 195, 255);
margin-left: 2%;
@media screen and (min-width: 375px) {
    padding: 2%;
}
@media screen and (min-width: 1366px) {
    padding: 1%;
}
&:hover {
background-color: transparent;
color: #017698;
}
`;

export const BackToTopLink = styled.a`
color:rgb(0, 195, 255);
background-color: rgb(254, 114, 53);
border-radius: 8px;
padding: .4%;
border: 2px solid rgb(0, 195, 255);
margin-left: 2%;
@media screen and (min-width: 375px) {
    padding: 2%;
}
@media screen and (min-width: 1366px) {
    padding: 1%;
}
&:hover {
background-color: transparent;
color: #017698;
}
`;

