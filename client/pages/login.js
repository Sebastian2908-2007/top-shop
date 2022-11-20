import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import { FormButton, FormInput, Form } from "../styles/Forms.styled";
import { FormSection } from "../styles/Section.styled";
import auth from "../utils/auth";

const login = () => {
    /**form state to be set in handleChange function */
    const [loginFormState,setLoginFormState] = useState({email:'',password:''});
    /**create mutation function login our current user as well as destructuing error functionality from useMutation */
    const [userLogin,{error}] = useMutation(LOGIN);

    /**login function */
    const submitLogin = async (event) => {
        event.preventDefault();
        try{ 
      const loginResponse = await userLogin({
         variables: {
                email: loginFormState.email,
                password:loginFormState.password
                 }
        });
        const token = loginResponse.data.loginUser.token;
        auth.login(token);
        console.log(token);
    }catch(e) {
        console.log(e);
    }
    };

    /*function for capturing state */
 const handleChange = (event) => {
    /**get name and value from the event */
    const {name,value} = event.target;
    /**set state in real time */
    setLoginFormState({
        /*keep prior added state */
        ...loginFormState,
        /*set state for current active input */
        [name]:value
    });

 };

    return(
        <FormSection>
            <Form onSubmit={submitLogin}>
                <FormInput onChange={handleChange} placeholder="Your Email" name="email" type='email'  marginTop='.5em'/>
                <FormInput onChange={handleChange} placeholder="Password" name="password" type='password'/>
                <FormButton type="submit">Login</FormButton>
            </Form>
        </FormSection>
    );
};
export default login;