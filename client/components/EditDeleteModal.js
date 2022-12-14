import { useState } from 'react';
import { useMutation } from '@apollo/client';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
/**import s3Delete function so s3images can be removed when a product is removed*/
import { s3Delete } from '../utils/s3';
/**import mutation to delete and edit a Product */
import { DELETE_PRODUCT, EDIT_PRODUCT } from '../utils/mutations';
import { DeleteProductButton, EditProductButton } from '../styles/Button.styled';
import { Form,FormInput } from '../styles/Forms.styled';
import { GET_ALL_PRODUCTS } from '../utils/queries';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
  export default function EditDeleteModal({
    open,
    setOpen,
    setEditOrDelete,
    editOrDelete,
    setModalInfo,
    modalInfo,
    }) 

    {
/**name mutation for deleting a product we also instruct get all products to be run each time this is */
const [deleteProduct] = useMutation(DELETE_PRODUCT,{
    refetchQueries:[{query: GET_ALL_PRODUCTS}]
});
/**name edit mutation we also instruct get all products to be run each time this is */
const [editProduct] = useMutation(EDIT_PRODUCT,{
    refetchQueries:[{query: GET_ALL_PRODUCTS}]
});

    
    /*closes modal and sets other state back to default */
    const handleClose = () => {setOpen(false); setModalInfo({}); setEditOrDelete(null)}; 

    /**delete function to run onClick when a user chooses to delete*/
    const deleteProductClick = async () => {
        
        try{
         await deleteProduct({variables:{_id: modalInfo._id}});
         handleClose();
        }catch(e){
            console.log(e);
            return;
        }
       try{
         s3Delete(modalInfo.Bucket,modalInfo.Key);
       }catch(e) {
        console.log(e);
       }
    };

    /**form data change handler function*/
    const handleFormChange = event => {
        const {name,value} = event.target;
        setModalInfo(
            {
                ...modalInfo,
                [name]:value
            }
        );
        
       
    };
    /**function that will implement edit functionality for the edit button 'to be called onClick' */
    const submitEdit = async (event) => {
        event.preventDefault();
    try{
        await editProduct({
            variables:{
                _id: modalInfo._id,
                name: modalInfo.name,
                description: modalInfo.description,
                price: parseInt(modalInfo.price),
                quantity: parseInt(modalInfo.quantity)
            }
        });
        //refetch();
        handleClose();
    }catch(e){
        console.log(e);
    };
    };

  
    return (
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
            {editOrDelete === 'delete' ?(
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Are you Sure you want to delete this product?
            </Typography>
         <DeleteProductButton onClick={deleteProductClick}>yes</DeleteProductButton>
         <EditProductButton onClick={handleClose}>no</EditProductButton>
          </Box>)
          :
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              use this form to edit your product
            </Typography>
            <Form transform='translateY(0%)'  onSubmit={submitEdit}>
                <FormInput onChange={handleFormChange} name="name" placeholder='edit name'/>
                <FormInput onChange={handleFormChange} name="description" placeholder='edit description'/>
                <FormInput onChange={handleFormChange} type='number' name="price" placeholder='edit price'/>
                <FormInput onChange={handleFormChange} type='number' name="quantity" placeholder='edit quantity'/>
                <DeleteProductButton onClick={handleClose}>Cancel</DeleteProductButton>
                <EditProductButton type='submit'>submit</EditProductButton>
            </Form>
          </Box>
  }
        </Modal>
      </div>
    );
  }