import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import {Form,FormInput,FormButton } from "../styles/Forms.styled";
import { FormSection } from "../styles/Section.styled";
import auth from "../utils/auth";

const CreateUser = () => {
     /**form state to be set in handleChange function */
     const [addUserFormState,setAddUserFormState] = useState({email:'',password:'',firstName:'',lastName:''});
     /**add user mutation creation */
     const [addUser,{error}] = useMutation(ADD_USER);

     /**add user function function */
    const submitAddUser = async (event) => {
        event.preventDefault();
        try{ 
      const addUserResponse = await addUser({
         variables: {
                email: addUserFormState.email,
                password:addUserFormState.password,
                firstName: addUserFormState.firstName,
                lastName: addUserFormState.lastName
                 }
        });
        const token = addUserResponse.data.addUser.token;
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
    setAddUserFormState({
        /*keep prior added state */
        ...addUserFormState,
        /*set state for current active input */
        [name]:value
    });

 };


        return(
            <FormSection>
                <Form onSubmit={submitAddUser} transform='translateY(25%)' transform390='translateY(40%)'
                transform540='translateY(25%)' transform768='translateY(35%)' padding1024='1%'
                transform1024='translateY(-6%)' transform1280='translateY(8%)' transform1366='translateY(-2%)'
                transform1920='translateY(20%)'
                >
                    <FormInput onChange={handleChange} placeholder="first name" name="firstName" type='firstName' />
                    <FormInput onChange={handleChange} placeholder="last name" name="lastName" type='lastName'/>
                    <FormInput onChange={handleChange} placeholder="Your Email" name="email" type='email'  marginTop='.5em'/>
                    <FormInput onChange={handleChange} placeholder="Password" name="password" type='password'/>
                    <FormButton type="submit">Complete Signup</FormButton>
                </Form>
            </FormSection>
        );
};
export default CreateUser;