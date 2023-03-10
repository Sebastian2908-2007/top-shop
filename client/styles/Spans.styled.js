import styled from 'styled-components';

export const CartTrashSpan = styled.span`
  cursor: default;
`;

export const ProductPriceSpan = styled.span`
//background-color: rgb(255,255,255,0.6);
//background:linear-gradient(to right, rgb(0, 119, 255),rgb(0,0,0,0.7));
background: linear-gradient(to right, rgb(254, 114, 53),rgb(0,0,0));
color: rgb(252, 245, 239);
text-shadow: 0 0 10px rgb(254, 167, 53);
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
color:rgb(252, 245, 239);
border: 2px solid rgb(252, 245, 239);
background: linear-gradient(to right, rgb(254, 114, 53),rgb(0,0,0));
//background-color: rgb(254, 167, 53);
border-radius: 8px;
padding: .4%;

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
color:rgb(0, 195, 255);
font-size: .8em;
`;

export const ReviewCardNameSpan = styled.span`
padding: 1%;
`;
export const EditLinkSpan = styled.span`
font-size: .7rem;
color:  #000080;
//color: #0000EE;
`;

export const UserOrderCardSpan = styled.span`
font-size: .7rem;
color:  rgb(248, 248, 128);
//color: #0000EE;
`;
export const SavedAddressModalSpan = styled.span`
font-size: .7rem;
color:  rgb(254, 167, 53);
background-color:rgb(0, 195, 255,.4);
padding: 2%;
//color: #0000EE;
`;
export const SavedAddressModalLabelSpan = styled.span`
font-size: 1rem;
color:  rgb(0, 119, 255);
//color: #0000EE;
`;

export const UserDetailsSpan = styled.span`
background-color:rgb(0, 119, 255,0.3);
margin-bottom: 2%;
padding: 4%;
//color: #0000EE;
`;