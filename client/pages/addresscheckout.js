import { useState, useEffect } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';
import { Button } from "@mui/material";
import { checkoutAdd2CartBtnStyle } from "../styles/commonMuiStyles/muiButtonStyles";
import { AddressForm,FormInput } from "../styles/Forms.styled";
import { FormSection } from "../styles/Section.styled";
import { useStoreContext } from '../utils/Globalstate';
import { QUERY_CHECKOUT } from '../utils/queries';
import { ADD_ADDRESS } from '../utils/mutations';
import {loadStripe} from '@stripe/stripe-js';

/**stripe pub key*/
const stripePromise = loadStripe(  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const addressCheckout = () => {
       /* useLazyQuery for doing our checkout query on button click*/
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
  /*mutation for adding the address*/
  const [addAddress] = useMutation(ADD_ADDRESS);
  const [ state, dispatch ] = useStoreContext();
  /**form state to be set in handleChange function */
  const [form,setForm] = useState({streetAddress:'',city:'',state:'',zip:'',country:''});

       /*function for capturing state */
 const handleChange = (event) => {
    /**get name and value from the event */
    const {name,value} = event.target;
    /**set state in real time */
    setForm({
        /*keep prior added state */
        ...form,
        /*set state for current active input */
        [name]:value
    });

 };

  const submitCheckout = async () => {
    const productIds = [];
  
    state.cart.forEach((item) => {
        for (let i = 0; i < item.purchaseQuantity; i++) {
            productIds.push(item._id);
        }
    });
   
    const address = await addAddress({
        variables:{
            streetAddress: form.streetAddress,
            city: form.city,
            state: form.state,
            zip: form.zip,
            country: form.country
        }
    });
    console.log(address);
   getCheckout({
     variables: { products: productIds }
    });
  };

  /*if data var changes we will be redirected to stripe checkout page*/
useEffect(() => {
    if (data) {
        stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: data.checkout.session });
        });
    }
  }, [data]);

  useEffect(() => {console.log(form)},[form]);

    return(
      <FormSection>
       <AddressForm>
         <FormInput onChange={handleChange} placeholder="Street Address" name="streetAddress" type="streetAddress"/>
         <FormInput onChange={handleChange} placeholder="city" name="city" type="city"/>
         <FormInput onChange={handleChange} placeholder="state" name="state" type="state"/>
         <FormInput onChange={handleChange} placeholder="zip" name="zip" type="zip"/>
         <FormInput onChange={handleChange} placeholder="country" name="country" type="country"/>
         <Button onClick={submitCheckout} sx={checkoutAdd2CartBtnStyle}>Secure Checkout</Button>
       </AddressForm>
     </FormSection>
    )
};

export default addressCheckout;