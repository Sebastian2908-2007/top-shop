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
color: rgb(245 245 6);
`;