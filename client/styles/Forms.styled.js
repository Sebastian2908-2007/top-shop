import styled from "styled-components";

export const LoginForm = styled.form`
display: flex;
flex-direction: column;
justify-content: center;
padding: 7%;
border: 3px solid rgb(0,0,0);
border-radius: 11px;
transform: translateY(50%);
@media screen and (min-width: 390px) {
    transform: translateY(70%);
}
@media screen and (min-width: 540px) {
    transform: translateY(50%);
}
@media screen and (min-width: 768px) {
    transform: translateY(60%);
    width: 70%
}
@media screen and (min-width: 1024px) {
    transform: translateY(0%);
}
@media screen and (min-width: 1366px) {
    padding: 4%;
    width: 50%;
    transform: translateY(20%);
}
@media screen and (min-width: 1920px) {
    padding: 3%;
    width: 45%;
    transform: translateY(45%);
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