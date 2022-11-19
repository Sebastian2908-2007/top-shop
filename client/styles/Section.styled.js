import styled from "styled-components";

export const HomeHeroSection = styled.section`
width: 100%;
@media screen and (min-width: 1366px) {
  padding: 4%;
 // background-color: rgb(248, 248, 128);
  //border-bottom: 50px solid black;
  display: flex;
  justify-content: center;
};
`;

export const ProductSection = styled.section`
padding: 3%;
padding-bottom: 5rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
@media screen and (min-width: 768px) {
    padding-bottom: 7rem;
};
@media screen and (min-width: 912px) {
    padding-bottom: 9rem;
};
@media screen and (min-width: 1366px) {
    padding-bottom: 11rem;
};
@media screen and (min-width: 1920px) {
    padding-bottom: 12rem;
};
`;

export const LoginSection = styled.section`
padding: 4%;
@media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: center;
    
}
`;