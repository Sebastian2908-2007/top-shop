import styled from "styled-components";

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