import styled from "styled-components";

/*forms for adding user and logging in */
export const Form = styled.form`
/**all transform props were added for the create user form and that is where they are being used */
display: flex;
flex-direction: column;
justify-content: center;
padding: 7%;
border: 3px solid rgb(0,0,0);
border-radius: 11px;
transform: ${props => props.transform ? props.transform:'translateY(50%)'};
background: ${props => props.errorColor };
@media screen and (min-width: 390px) {
    transform: ${props => props.transform390 ? props.transform390:'translateY(70%)'};
}
@media screen and (min-width: 540px) {
    transform: ${props => props.transform540 ? props.transform540:'translateY(50%)'};
}
@media screen and (min-width: 768px) {
    transform: ${props => props.transform768 ? props.transform768:'translateY(60%)'};
    width: 70%
}
@media screen and (min-width: 1024px) {
    padding: ${props => props.padding1024 };
    transform: ${props => props.transform1024 ? props.transform1024:'translateY(0%)'};
}
/*this media query was made only for add user form */
@media screen and (min-width: 1280px) {
    transform: ${props => props.transform1280};
}
@media screen and (min-width: 1366px) {
    padding: 4%;
    width: 50%;
    transform: ${props => props.transform1366 ? props.transform1366:'translateY(20%)'};
}
@media screen and (min-width: 1920px) {
    padding: 3%;
    width: 45%;
    transform: translateY(45%);
    transform: ${props => props.transform1920 ? props.transform1920:'translateY(45%)'};
}
`;

export const AddressForm = styled.form`
/**all transform props were added for the create user form and that is where they are being used */
display: flex;
flex-direction: column;
justify-content: center;
padding: 7%;
border: 3px solid rgb(0,0,0);
border-radius: 11px;
background: ${props => props.errorColor };
@media screen and (min-width: 390px) {
    
}
@media screen and (min-width: 540px) {
    
}
@media screen and (min-width: 768px) {
    
    width: 70%
}
@media screen and (min-width: 1024px) {
    padding: ${props => props.padding1024 };
   
}
/*this media query was made only for add user form */
@media screen and (min-width: 1280px) {
    
}
@media screen and (min-width: 1366px) {
    padding: 4%;
    width: 50%;
    
}
@media screen and (min-width: 1920px) {
    padding: 3%;
    width: 45%;
   
}
`;

/**form for editDelete modal*/
export const EditDeleteForm = styled.form`
/**all transform props were added for the create user form and that is where they are being used */
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
padding: 7%;
border: 3px solid rgb(248, 248, 128);
border-radius: 11px;
background: ${props => props.errorColor };
@media screen and (min-width: 390px) {
    
}
@media screen and (min-width: 540px) {
    
}
@media screen and (min-width: 768px) {
    width: 100%
}
@media screen and (min-width: 1024px) {
    padding: ${props => props.padding1024 };
}
/*this media query was made only for add user form */
@media screen and (min-width: 1280px) {
   
}
@media screen and (min-width: 1366px) {
    padding: 4%;
   // width: 50%;
}
@media screen and (min-width: 1920px) {
    padding: 3%;
    //width: 45%;
}
`;




export const FormInput = styled.input`
font-size: 1.3em;
margin-top:${props => props.marginTop ? props.marginTop : '1em'};
margin-bottom: 1em;
border: 2px solid rgb(0,0,0);
`;


export const FormButton = styled.button`
font-size: 1.1em;
margin-top: 1em;
background-color: rgb(0,0,0,0.7);
color: rgb(248, 248, 128);
&:hover {
color: rgb(0,0,0);
background-color: rgb(0,0,0,0.4);
border: 1px solid rgb(245 245 6);
};
`;
/*forms for adding user and logging in end */

/**forms related to Admin dash begin */
export const AdminForm = styled.form`
width: 100%;
height:${props => props.height ? props.height:'12%'};
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;
margin-top: ${props => props.marginTop};
@media screen and (min-width:1280px){
   /**this prop was specifically made for the admin form*/
   height:${props => props.height1280};
   margin-top: ${props => props.marginTop1280};
}
`;

export const AdminFormInput = styled.input`
width: 100%;
border: 2px solid rgba(223,223,16,1);
background: rgba(223,223,16,0.4);
color: black;
border-radius: 11px;
text-align: center;
&::placeholder {
   color: rgba(223,223,16,1);
  }
@media screen and (min-width:540px) {
    width: 70%;
}
@media screen and (min-width:768px) {
    font-size: 1em;
}
@media screen and (min-width:1024px){
   width: 50%;
}
@media screen and (min-width:1280px){
   width: 40%;
   /**this prop was specifically made for the admin form*/
   margin-top: ${props => props.marginTop1280};
   margin-bottom: ${props => props.marginBtm1280};
}
`;

/**input for delete edit modal form */
export const EditDeleteFormInput = styled.input`
width: 100%;
border: 2px solid rgba(223,223,16,1);
background: rgba(223,223,16,0.4);
color: black;
border-radius: 11px;
text-align: center;
margin-bottom: 1em;
&::placeholder {
   color: rgba(223,223,16,1);
  }
@media screen and (min-width:540px) {
    width: 70%;
}
@media screen and (min-width:768px) {
    font-size: 1em;
}
@media screen and (min-width:1024px){
   width: 50%;
}
@media screen and (min-width:1280px){
   width: 40%;
   /**this prop was specifically made for the admin form*/
   margin-top: ${props => props.marginTop1280};
   margin-bottom: ${props => props.marginBtm1280};
}
`;

export const AdminTextArea = styled.textarea`
width: 100%;
border-radius: 11px;
height: 55%;
border: 2px solid rgba(223,223,16,1);
background: rgba(223,223,16,0.4);
color: black;
margin-bottom: 1em;
&::placeholder {
   color: rgba(223,223,16,1);
  }
  @media screen and (min-width:540px) {
    width: 70%;
    font-size: 1.1rem;
}
  @media screen and (min-width:768px) {
    
    font-size: 1.4rem;
}
@media screen and (min-width:1024px){
    width: 50%;
   height: 35%;
}
@media screen and (min-width:1280px){
  
   width: 40%;
}
@media screen and (min-width:1366px){
   
   height: 55%;
}
`;

export const AdminFormButton = styled.button`
width: 30%;
border-radius: 11px;
margin-top: 1%;
padding: 1%;
border: 1px solid rgba(223,223,16,1);
color: rgba(223,223,16,1);
background: linear-gradient(to left, rgb(199, 197, 104),rgb(0,0,0));
@media screen and (min-width:768px) {
    font-size: .9em;
}
`;
/**forms related to Admin dash end*/
/**review form related*/
export const ReviewFormTextArea = styled.textarea`
width: 100%;
border-radius: 11px;
height: 55%;
border: 2px solid rgba(223,223,16,1);
background: rgba(223,223,16,0.4);
color: black;
&::placeholder {
   color: rgba(223,223,16,1);
  }
  @media screen and (min-width:540px) {
    width: 70%;
    font-size: 1.1rem;
}
  @media screen and (min-width:768px) {
    
    font-size: 1.4rem;
}
@media screen and (min-width:1024px){
    width: 50%;
   height: 35%;
}
@media screen and (min-width:1280px){
  
   width: 40%;
}
@media screen and (min-width:1366px){
   
   height: 55%;
}
`;