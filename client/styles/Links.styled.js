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
background-color: rgb(248, 248, 128);
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