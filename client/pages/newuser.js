import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import {Form,FormInput,FormButton,AddForm } from "../styles/Forms.styled";
import { FormSection } from "../styles/Section.styled";
import { LoginSignupErrorDiv } from "../styles/Div.styled";
import auth from "../utils/auth";

const CreateUser = () => {
     /**form state to be set in handleChange function */
     const [addUserFormState,setAddUserFormState] = useState({email:'',password:'',firstName:'',lastName:''});
       /*state for error message THIS IS NOT DRY!!!*/
    const [errorMsg,setErrorMsg] = useState('');
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
    }catch(e) {
        setErrorMsg(e.message);
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
            <FormSection flxDirErr={error && 'column'} alignItemsErr={error &&'center'} pdngBtmErr={error && '9em'}>
                {error && <LoginSignupErrorDiv>{errorMsg} Please Try again!</LoginSignupErrorDiv> }
                {/*<Form onSubmit={submitAddUser} transform={error ? 'translateY(1%)':'translateY(15%)' transform390='translateY(40%)'
                transform540={error ? 'translateY(11%)':'translateY(11%)'} transform768='translateY(35%)' padding1024='1%'
                transform1024={error ? 'translateY(2%)':'translateY(-6%)'} transform1280='translateY(8%)' transform1366={error ? 'translateY(2%)':'translateY(-2%)'}
                transform1920='translateY(20%)' errorColor={error && 'linear-gradient(rgb(0,0,0,0.8),rgb(170, 74, 68))'}
        >*/}
                <AddForm onSubmit={submitAddUser} errorColor={error && 'linear-gradient(rgb(0,0,0,0.8),rgb(170, 74, 68))'}>
                    <FormInput onChange={handleChange} placeholder="first name" name="firstName" type='firstName' />
                    <FormInput onChange={handleChange} placeholder="last name" name="lastName" type='lastName'/>
                    <FormInput onChange={handleChange} placeholder="Your Email" name="email" type='email' marginTop='.5em'/>
                    <FormInput onChange={handleChange} placeholder="Password" name="password" type='password'/>
                    <FormButton type="submit">Complete Signup</FormButton>
                    </AddForm>
                {/*</Form>*/}
            </FormSection>
        );
};
export default CreateUser;