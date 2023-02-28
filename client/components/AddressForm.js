import { useState, useEffect } from 'react';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
/**modal for previous address*/
import SavedAddressModal from './SavedAddressModal';
import { Button } from "@mui/material";
import { checkoutAdd2CartBtnStyle } from "../styles/commonMuiStyles/muiButtonStyles";
import { AddForm,FormInput } from "../styles/Forms.styled";
import { AddressFormSection } from "../styles/Section.styled";
import { useStoreContext } from '../utils/Globalstate';
import { QUERY_CHECKOUT,GET_USER_ADDRESS_FOR_CHECKOUT } from '../utils/queries';
import { ADD_ADDRESS } from '../utils/mutations';
import auth from '../utils/auth';
import {loadStripe} from '@stripe/stripe-js';
import { PreviousAddressBtn } from '../styles/Button.styled';

/**stripe pub key*/
const stripePromise = loadStripe(  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
const AddressForm = () => {

          /* useLazyQuery for doing our checkout query on button click*/
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
 
  /**get the current user by _id so that we can determin whether or not they have added an address in the past*/
  const {loading, data: addressData} = useQuery(GET_USER_ADDRESS_FOR_CHECKOUT,{variables:{_id: auth.getProfile().data._id}});

  /*mutation for adding the address*/
  const [addAddress] = useMutation(ADD_ADDRESS);
  const [ state, dispatch ] = useStoreContext();
  /**form state to be set in handleChange function */
  const [form,setForm] = useState({streetAddress:'',city:'',state:'',zip:'',country:''});
  /**state var to open address modal */
  const [open,setOpen] = useState(false);

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
   getCheckout({
     variables: { products: productIds }
    });
  };

  /*if data var changes we will be redirected to stripe checkout page*/
useEffect(() => {
    if (data) {
      console.log("data",data);
        stripePromise.then((res) => {
            res.redirectToCheckout({ sessionId: data.checkout.session });
        });
    }
  }, [data]);

  /**if user data is loading return loading div*/
  if(loading) {
    return(
        <div>loading...</div>
    )
  }
/**make an object containing the users previous address if it exists*/
if(addressData.getUserById.address !== null) {
  /**var used because its function scoped use of state in the ways I've tried causes infinite re renders */
var previousAddress = {
    streetAddress: addressData.getUserById.address.streetAddress,
    city: addressData.getUserById.address.city,
    state: addressData.getUserById.address.state,
    zip: addressData.getUserById.address.zip,
    country: addressData.getUserById.address.country
};
}

    return(
        <AddressFormSection>
            <SavedAddressModal
             open={open}
             setOpen={setOpen} 
             submitCheckout={submitCheckout}
             previousAddress={previousAddress}
             addressData={addressData}
             />
        <AddForm>
          <FormInput border='2px solid rgb(254, 114, 53)' onChange={handleChange} placeholder="Street Address" name="streetAddress" type="streetAddress"/>
          <FormInput border='2px solid rgb(254, 114, 53)' onChange={handleChange} placeholder="city" name="city" type="city"/>
          <FormInput border='2px solid rgb(254, 114, 53)' onChange={handleChange} placeholder="state" name="state" type="state"/>
          <FormInput border='2px solid rgb(254, 114, 53)' onChange={handleChange} placeholder="zip" name="zip" type="zip"/>
          <FormInput border='2px solid rgb(254, 114, 53)' onChange={handleChange} placeholder="country" name="country" type="country"/>
          <Button onClick={submitCheckout} sx={checkoutAdd2CartBtnStyle}>Secure Checkout</Button>
        </AddForm>
       
        {!addressData.getUserById.address  ? null: <PreviousAddressBtn onClick={() => {setOpen(true)}}>use saved address?</PreviousAddressBtn>}
     
      </AddressFormSection>
    )
};

export default AddressForm;