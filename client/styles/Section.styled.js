import styled from "styled-components";

export const HomeHeroSection = styled.section`
width: 100%;
//position: relative;
//overflow: hidden;
@media screen and (min-width: 1366px) {
  padding: 8%;
  padding-bottom: 8%;
  background: linear-gradient(to right, rgb(0, 119, 255),rgb(0,0,0,0.7));
 // background-color: rgb(248, 248, 128);
  //border-bottom: 50px solid black;
  display: flex;
  justify-content: center;
};
`;

export const ProductSection = styled.section`
padding: 3%;
padding-bottom: 6rem;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
@media screen and (min-width: 768px) {
    padding-bottom: 8rem;
};
@media screen and (min-width: 912px) {
    padding-bottom: 10rem;
};
@media screen and (min-width: 1366px) {
    padding-bottom: 12rem;
};
@media screen and (min-width: 1920px) {
    padding-bottom: 13rem;
};
`;

export const FormSection = styled.section`
padding: 4%;
height: auto;
/**I start using below prop on form error at 1024 px */
padding-bottom: ${props => props.pdngBtmErr};
@media screen and (min-width: 768px) {
    display: flex;
     /**these props will be used with error only */
    flex-direction:${props => props.flxDirErr ? props.flxDirErr: 'row'};
    justify-content: center;
    /**used only when a form error is present */
    align-items: ${props => props.alignItemsErr};
}
`;

export const MainAdminSection = styled.section`
padding: 2%;
height: auto;
padding-bottom: 5em;
@media screen and (min-width:1024px){
    padding-bottom: 10em;
}
@media screen and (min-width:1920px){
    padding-bottom: 15em;
}
`;

/*this should be re usable in each section */
export const CarouselAdminSection = styled.section`
display: flex;
flex-direction: column;
align-items: center;
padding: 2%;
height: 100%;
width: 100%;
`;

export const AdminCategoriesSection = styled.section`
height: 70%;
width: 100%;
margin-top: 3%;
border: 2px solid rgba(223,223,16,1);
border-radius: 11px;
`;

export const AdminProductPageSection = styled.section`
height: 100%;
width: 100%;
padding: 5%;
padding-bottom: 5em;
@media screen and (min-width: 768px){
    padding-bottom: 8em; 
}
@media screen and (min-width: 1280px){
    padding-bottom: 11em; 
}
@media screen and (min-width: 1920px){
    padding-bottom: 13em; 
}
@media screen and (min-width: 2560px){
    padding-bottom: 18em; 
}
`;

export const BlogpostSection = styled.section`
height: 100%;
width: 100%;
padding: 5%;
padding-bottom: 11em;
@media screen and (min-width: 2560px){
    padding-bottom: 13em; 
}
`;

export const BlogPostHeroSection = styled.section`
width: 100%;
background: linear-gradient(to right, rgb(0, 119, 255),rgb(0,0,0,0.7));
padding-bottom: .1%;
@media screen and (min-width: 768px) {
 // background-color: rgb(248, 248, 128);
  //border-bottom: 50px solid black;
  padding: 4%;
  padding-bottom: 1%;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to right, rgb(0, 119, 255),rgb(0,0,0,0.7));
};
`;
export const SingleBlogpostSection = styled.section`
height: 100%;
width: 100%;
padding: 5%;
padding-bottom: 11em;
display: flex;
flex-direction: column;
align-items: center;
@media screen and (min-width: 2560px){
    padding-bottom: 13em; 
}
`;

export const SingleBlogPostHeroSection = styled.section`
width: 100%;
background: linear-gradient(to right, rgb(0, 119, 255),rgb(0,0,0,0.7));
padding: 4%;
padding-bottom: 1%;
@media screen and (min-width: 768px) {
    display: flex;
    justify-content: center;
  flex-direction: column;
  align-items: center; 
}
@media screen and (min-width: 1024px) {
 // background-color: rgb(248, 248, 128);
  //border-bottom: 50px solid black;
  padding: 4%;
  padding-bottom: 2%;
  width: 100%;
  height: auto;
}
`;
/**A section for the reviews originally cloned from the Products section styled component */
export const ReviewSection = styled.section`
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

export const AdminUsersSection = styled.section`
height: 100%;
width: 100%;
padding: 5%;
padding-bottom: 11em;
`;


export const SuccessSection = styled.section`
height: 100%;
width: 100%;
padding: 5%;
padding-bottom: 11em;
`;

export const AddressFormSection = styled.section`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
max-width: 100%;
padding: 4%;
padding-bottom: 5rem;
height: auto;
/**I start using below prop on form error at 1024 px */
padding-bottom: ${props => props.pdngBtmErr};
@media screen and (min-width: 540px) {
  padding-bottom: 7rem;
}
@media screen and (min-width: 768px) {
  padding-top: 5rem;
}
@media screen and (min-width: 1366px) {
  padding-bottom: 13rem;
}
`;

export const UserPersonalDetailsSection = styled.section`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
background-color: rgb(255,255,255,0.4);
border: 1px solid rgb(0, 119, 255);
border-radius:8px;
box-shadow:  0 0 10px black;
width: 100%;
padding: 4%;
`;
export const UserOrdersSection = styled.section`
height: auto;
width: 100%;
padding: 1%;
`;

export const UserDetailsSection = styled.section`
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;
height: 100%;
width: 100%;
padding: 5%;
padding-bottom: 11em;
`;

export const AboutSection = styled.section`
height: auto;
width: 100%;
padding: 8%;
border: 2px solid rgb(0, 119, 255);
background: linear-gradient(to right, rgb(0, 119, 255),rgb(0,0,0,0.7));
box-shadow:0 0 10px rgb(254, 167, 53);
border-radius: 8px;
@media screen and (min-width: 1024px) {
   width: 100%;
   display: flex;
flex-direction: column;
align-items: center;
box-shadow:0 0 20px rgb(254, 167, 53);
}
`;

export const SingleBlogSection = styled.section`
height: auto;
width: 100%;
padding: 8%;
border: 1px solid rgb(252, 245, 239);
background: linear-gradient(to left, rgb(0, 119, 255),rgb(0,0,0,0.7));
box-shadow:0 0 10px rgb(0,0,0);
border-radius: 8px;
@media screen and (min-width: 1024px) {
   width: 100%;
   padding: 3%;
   display: flex;
flex-direction: column;
align-items: center;
box-shadow:0 0 20px rgb(254, 167, 53);
}
`;
export const OuterAboutSection = styled.section`
height: 100%;
width: 100%;
padding: 5%;
padding-bottom: 5rem;
@media screen and (min-width: 540px) {
    padding-bottom: 10rem;
}
@media screen and (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
}
@media screen and (min-width: 1920px) {
    padding-bottom: 14rem;
}
`;

export const AboutHeroSection = styled.section`
width: 100%;
//background: linear-gradient(to right, rgb(0, 119, 255),rgb(0,0,0,0.7));
padding-bottom: .1%;
@media screen and (min-width: 768px) {
 // background-color: rgb(248, 248, 128);
  //border-bottom: 50px solid black;
  padding: 4%;
  padding-bottom: 1%;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(to right, rgb(0, 119, 255),rgb(0,0,0,0.7));
};
`;