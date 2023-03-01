import { useEffect } from 'react';
import { useLazyQuery} from '@apollo/client';
import { QUERY_CHECKOUT } from '../utils/queries';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { SavedAddressModalSpan,SavedAddressModalLabelSpan } from '../styles/Spans.styled';
import { AddressModalDiv } from '../styles/Div.styled';
import { AddressModalCancelButton,AddressModalCheckoutButton } from '../styles/Button.styled';
import { useStoreContext } from '../utils/Globalstate';
import {loadStripe} from '@stripe/stripe-js';



/**stripe pub key*/
const stripePromise = loadStripe(  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const SavedAddressModal = ({open,setOpen,previousAddress}) => {
  const style = {
    display:"flex",
    flexDirection: "column",
    alignItems:"center",
    width: '80%',
    '@media screen and (min-width:1366px )': {
      width:'35%',
     },
      position: 'absolute',
      top: '50%',
      padding: '5%',
      left: '50%',
      transform: 'translate(-50%, -50%)',  
      bgcolor: 'rgb(0,0,0,.8)',
      border: '2px solid rgb(254, 114, 53)',
      boxShadow: 24,
    };
 /* useLazyQuery for doing our checkout query on button click*/
const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

    const [state] = useStoreContext();  
    const handleClose = () => {setOpen(false);};

    const submitCheckout = async () => {
        const productIds = [];
      
        state.cart.forEach((item) => {
            for (let i = 0; i < item.purchaseQuantity; i++) {
                productIds.push(item._id);
            }
        });
       
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

return(
  /**If prvious address is undefined return null as such is in the case of a new user if not make the modal
   * Modal will not even be accessible unless it is in the case of a previous user
  */
  previousAddress ? (
    <div>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      
        <SavedAddressModalLabelSpan>Street Address</SavedAddressModalLabelSpan>
    <SavedAddressModalSpan>{previousAddress.streetAddress}</SavedAddressModalSpan>
    <SavedAddressModalLabelSpan>State</SavedAddressModalLabelSpan>
    <SavedAddressModalSpan>{previousAddress.state}</SavedAddressModalSpan>
    <SavedAddressModalLabelSpan>City</SavedAddressModalLabelSpan>
    <SavedAddressModalSpan>{previousAddress.city}</SavedAddressModalSpan>
    <SavedAddressModalLabelSpan>Zip</SavedAddressModalLabelSpan>
    <SavedAddressModalSpan>{previousAddress.zip}</SavedAddressModalSpan>
    <SavedAddressModalLabelSpan>Country</SavedAddressModalLabelSpan>
    <SavedAddressModalSpan>{previousAddress.country}</SavedAddressModalSpan>
    <AddressModalDiv>
        <AddressModalCancelButton onClick={() => {handleClose()}}>Cancel</AddressModalCancelButton>
        <AddressModalCheckoutButton onClick={() => {submitCheckout()}}>Secure Checkout</AddressModalCheckoutButton>
    </AddressModalDiv>

    </Box>
          
        
    </Modal>
    </div>
  ):null
);
};

export default SavedAddressModal;