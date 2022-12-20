import styled from 'styled-components';

export const CartTrashSpan = styled.span`
  cursor: default;
`;

export const ProductPriceSpan = styled.span`
background-color: rgb(255,255,255,0.6);
font-size: 1.3rem;
padding: ${props => props.padding ? props.padding: '6%'};
margin-bottom: ${props => props.marginBottom};
`;
/**related to product card admin only */
export const AdminItemNameSpan = styled.span`
font-weight: bolder;
font-family: 'Courier New', Courier, monospace;
`;

export const BackSpan = styled.span`
color:rgb(248, 248, 128);
background-color: black;
border-radius: 8px;
padding: .4%;
border: 2px solid rgb(248, 248, 128);
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
export const ContinueReadSpan = styled.span`
color:#017698;
font-size: .8em;
`;