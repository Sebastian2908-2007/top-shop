import {  useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { SavedAddressModalSpan,SavedAddressModalLabelSpan } from '../styles/Spans.styled';

const style = {
    display:"flex",
    flexDirection: "column",
    alignItems:"center",
      position: 'absolute',
      top: '50%',
      padding: '5%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      bgcolor: 'rgb(0,0,0,.8)',
      border: '2px solid rgb(254, 114, 53)',
      boxShadow: 24,
    };
const SavedAddressModal = ({open,setOpen,submitCheckout,previousAddress}) => {

  console.log(previousAddress);
    const handleClose = () => {setOpen(false);}
   
return(
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
    </Box>
          
        
    </Modal>
    </div>
);
};

export default SavedAddressModal;