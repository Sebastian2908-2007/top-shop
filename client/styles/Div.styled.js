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