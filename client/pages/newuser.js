import {Form,FormInput,FormButton } from "../styles/Forms.styled";
import { FormSection } from "../styles/Section.styled";

const CreateUser = () => {
        return(
            <FormSection>
                <Form transform='translateY(25%)' transform390='translateY(40%)'
                transform540='translateY(25%)' transform768='translateY(35%)' padding1024='1%'
                transform1024='translateY(-6%)' transform1280='translateY(8%)' transform1366='translateY(-2%)'
                transform1920='translateY(20%)'
                >
                    <FormInput placeholder="Your Email" name="email" type='email'  marginTop='.5em'/>
                    <FormInput placeholder="Password" name="password" type='password'/>
                    <FormInput placeholder="first name" />
                    <FormInput placeholder="last name"/>
                    <FormButton type="submit">Complete Signup</FormButton>
                </Form>
            </FormSection>
        );
};
export default CreateUser;