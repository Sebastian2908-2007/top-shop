import styled from 'styled-components';

export const FooterDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
height: 2rem;
margin: 2% 1% 2% 1%;
@media screen and (min-width: 768px) {
    margin: 3% 1% 2% 1%;
}
@media screen and (min-width: 912px) {
    height: 3.5rem;
}
`;

export const HeaderCartMenuDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;
/**cart menu wrapper div */
export const cartMenuWrapperDiv = styled.div`
width: 70%;
`;
/**inner cart related divs */
export const MenuItemMainDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
`;

export const MenuItem2MainDiv = styled.div`
padding: 3% 1% 3% 5%;
max-width: 60%;
`;

export const CartImgDiv = styled.div`
width: 55%;
display: flex;
flex-direction: row;
align-items: center;
`;
export const QtyInputTrashDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
`;


export const ProductPriceDiv = styled.div`
margin-bottom: 11%;

`;

export const CategoryDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
flex-flow: row wrap;
margin-bottom: 1.5em;
background-color: rgb(255,255,255,0.4);
padding-top: 5%;
border: 1px solid black;
border-radius: 11px;
box-shadow:  0 0 10px black;
@media screen and (min-width: 768px) {
   padding-top: 2.5%;
}
@media screen and (min-width: 912px) {
   padding-top: 2%;
}
`;

export const ProductCartNameDiv = styled.div`
padding: 1%;
`;

/**product section product div */

export const NoProductDiv = styled.div`
font-size: 3em;
margin-top: 1em;
`;
export const NoCategoryDiv = styled.div`
font-size: 3em;
margin-top: 1em;
`;

export const LoginSignupErrorDiv = styled.div`
font-size: .8em;
border: 1px solid black;
background: linear-gradient(to right ,rgb(0,0,0,0.8),rgb(170, 74, 68));
color:rgb(245 245 6);
padding: 3%;
text-align: center;
@media screen and (min-width: 768px) {
    font-size: 1em;
}
`;

export const CurrentCategoryDiv = styled.div`
display: flex;
flex-flow: row wrap;
justify-content:center;
width: 100%;
max-height: 100%;
`;
/**product card divs related to admin product card functionality */
export const ProductCardCategoryDiv = styled.div`
font-weight: bolder;
padding: 2%;
background-color: rgb(248, 248, 128);
`;

export const AdminProductBtnDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 6%;
width:${props => props.width ? props.width : '60%'};
background-color: rgb(248, 248, 128);
box-shadow: 0 0 10px black;
@media screen and (min-width: 540px) {
    width: 40%;
    padding: 4%;
}
`;
export const AdminEditDeleteBtnDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 6%;
width:${props => props.width ? props.width : '60%'};
background-color: rgb(248, 248, 128);
box-shadow: 0 0 10px rgb(248, 248, 128);
@media screen and (min-width: 540px) {
    width: 40%;
    padding: 4%;
}
`;

/**div for form errors on admin side */
export const AdminFormErrDiv = styled.div`
font-size: .5em;
border: 1px solid black;
margin-top: 1rem;
border-radius: 11px;
background: linear-gradient(to right ,rgb(0,0,0,0.8),rgb(170, 74, 68));
color:rgb(245 245 6);
padding: 3%;
text-align: center;
@media screen and (min-width: 768px) {
    font-size: 1em;
}
`;

export const SingleBlogLinkDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
padding: ${props => props.padding ? props.padding : '2%'};
margin-top: ${props => props.marginTop};
border-radius: ${props => props.borderRadius};
background: ${props => props.background};
@media screen and (min-width: 1024px){
    padding: 3%;
}
`;
export const BlogLinkDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
width: 100%;
padding:2%;

@media screen and (min-width: 1024px){
    padding: 3%;
}
`;

export const NotAdminDiv = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
text-align: center;
`;

