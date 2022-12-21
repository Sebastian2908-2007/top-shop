import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import Router from "next/router";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
/**import s3Delete function so s3images can be removed when a product is removed*/
import { s3Delete, s3Upload } from '../utils/s3';
/**import mutation to delete and edit a Product */
import { DELETE_PRODUCT, EDIT_PRODUCT,ADD_FILE } from '../utils/mutations';
/**styled components */
import { DeleteProductButton, EditProductButton } from '../styles/Button.styled';
import { Form,FormInput } from '../styles/Forms.styled';
import { AdminTextArea, AdminFormInput } from "../styles/Forms.styled";
/**styled components end*/
import { GET_ALL_PRODUCTS, GET_BLOGPOSTS_ALL_DATA,GET_BLOG_POST_BY_ID } from '../utils/queries';
/*Mutation to delete and edit blogposts*/
import { DELETE_BLOGPOST, EDIT_BLOG_POST } from "../utils/mutations";
/**need switch cases in submit edit and delete clock functions that find out which mutation should be ran
 * based on modelInfo.itemType eventually there will be one for products blogposts
 * users and reviews so four different potential try catch blocks in each function "deleteClick & submitEdit"
 * respectively also we will conditionally render the UI based on the same piece of date modalInfo.itemType within the edit or delete
 * conditional which is already based of of modalInfo.EditOrDelete. eventually there will be a piece of UI for
 * editing and deleting products, blogposts, users, reviews all of this info will be set on button click functions related to each individual page
 * or parent component
 */
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
    //setEditOrDelete,
   
    setModalInfo,
    modalInfo,
    }) 

    {
      //console.log(modalInfo);
      /**get our itemType for our data rendering and operations it will be set in useEffect with the modalInfo.itemType data*/
      const [itemType,SetItemType] = useState('');
      useEffect(() => {SetItemType(modalInfo.itemType)},[open]);
     // useEffect(() => {console.log(modalInfo)},[modalInfo]);
/**name mutation for deleting a product we also instruct get all products to be run each time this is */
const [deleteProduct] = useMutation(DELETE_PRODUCT,{
    refetchQueries:[{query: GET_ALL_PRODUCTS}]
});
/**name edit mutation we also instruct get all products to be run each time this is */
const [editProduct] = useMutation(EDIT_PRODUCT,{
    refetchQueries:[{query: GET_ALL_PRODUCTS}]
});
/*name blogpost mutation to delete blogposts*/
const [deleteBlogPost] = useMutation(DELETE_BLOGPOST,{
  refetchQueries:[{query: GET_BLOGPOSTS_ALL_DATA}]
});
/**name mutation to edit blogposts*/
const [editBlogPost] = useMutation(EDIT_BLOG_POST);
/**mutation to add a file or a picture in this case for editing a blogpost*/
const [addNewPicture] = useMutation(ADD_FILE);

    
    /*closes modal and sets other state back to default */
const handleClose = () => {setOpen(false); setModalInfo({})/*setEditOrDelete(null)*/}; 

    /**delete function to run onClick when a user chooses to delete*/
    const deleteClick = async () => {
      /**use a switch case to determine which type of item we are dealing with and run the valid LOGIC for it*/
        switch(modalInfo.itemType) { 
          /**PRODUCT LOGIC STARTS */
          case 'product':
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
       break;
       /**PRODUCT LOGIC ENDS */
/**BLOGPOST LOGIC STARTS */
       case 'blogpost':
        console.log('your deleting a blogpost!!!');
        try{
          await deleteBlogPost({variables:{_id: modalInfo._id}});
          handleClose();
        }catch(e){
          console.log(e);
          return;
        }
        try{
          s3Delete(modalInfo.Bucket,modalInfo.Key);
          Router.back();
        }catch(e) {
          console.log(e);
        }
        break;
       /**BLOGPOST LOGIC ENDS */

      };
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

       /**this is used to capture the file or picture from form*/
       const handleFileChange = event => {
        /**if a file is added add blogPic property to the modalInfo with the value of the current file*/
        setModalInfo({...modalInfo,blogPic:event.target.files[0]});
    };

    /**function that will implement edit functionality for the edit button 'to be called onClick' */
    const submitEdit = async (event) => {
        event.preventDefault();
        /**DETERMINE WHICH ITEM WE ARE DEALING WITH PRODUCT, BLOGPOST ETC. and run the proper LOGIC */
        switch(modalInfo.itemType) { 
      /**PRODUCT LOGIC STARTS */
          case 'product':
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
        handleClose();
    }catch(e){
        console.log(e);
    };
    break;
  /**PRODUCT LOGIC ENDS */

  /**BLOGPOST LOGIC STARTS */
    case 'blogpost':
      console.log(modalInfo.title, modalInfo.blogText);

      /**the below if statement only happens if there is new blog pic info detected */
if(modalInfo.blogPic) {
  try{
    /**send new file to s3 for upload and to get required data for our fileUpload mutation a.k.a addNewPicture*/
    const newBlogPicInfo = await s3Upload(modalInfo.blogPic);
    /**destructure returned s3 data for ease of use*/
    const {ETag,Location,Bucket,key,Key} = newBlogPicInfo;
    /**run our file upload mutation with returned s3 data as variables put operation as a variable so the id can be extracted for out edit blogPost mutation*/
    const newBlogPic = await addNewPicture({
      variables:{
        ETag: ETag,
        Location: Location,
        Bucket: Bucket,
        key: key,
        Key: Key
      }
    });
    /**extract the _id for our editBlogpost mutation*/
    const newBlogPicId = newBlogPic.data.addFile._id;
    /**run editBlogPost to update the blogPic*/
    await editBlogPost({
      variables: {
        _id: modalInfo._id,
        blogPic: newBlogPicId
      }
    });
    s3Delete(modalInfo.Bucket,modalInfo.Key);
  }catch(e){
    console.log(e);
  }
}
/**below will edit only text fields of blogposts but it runs each time */
      try{
        await editBlogPost({variables:{
          _id: modalInfo._id,
          title: modalInfo.title,
          blogText: modalInfo.blogText
        }})
        /**close Modal once done */
        handleClose();
        /**reload the page to displayt new data since its statically generated refetch will not work*/
        Router.reload();
      }catch(e) {
        console.log(e);
        return;
      };
      break;
  /**BLOGPOST LOGIC ENDS */
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
            {modalInfo.EditOrDelete === 'delete' ?( 
         
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {`Are you Sure you want to delete this ${itemType}?`}
            </Typography>
         <DeleteProductButton onClick={deleteClick}>yes</DeleteProductButton>
         <EditProductButton onClick={handleClose}>no</EditProductButton>
            
          </Box>
          
            )
          :
          
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {` use this form to edit your ${itemType}?`}
            </Typography>
            <Form transform='translateY(0%)'  onSubmit={submitEdit}>
              {itemType === 'product' &&
              <>
                <FormInput onChange={handleFormChange} name="name" placeholder='edit name'/>
                <FormInput onChange={handleFormChange} name="description" placeholder='edit description'/>
                <FormInput onChange={handleFormChange} type='number' name="price" placeholder='edit price'/>
                <FormInput onChange={handleFormChange} type='number' name="quantity" placeholder='edit quantity'/>
                </>
            }
            {itemType === 'blogpost' && 
            <>
            <AdminFormInput  onChange={handleFormChange} name='title' placeholder='edit blog title'/>
            <AdminTextArea  onChange={handleFormChange}  name="blogText" placeholder="Blog Post Text"/>
            <AdminFormInput  onChange={handleFileChange} type='file' name='blogPic' placeholder='edit blog picture'/>
            </>}
            <DeleteProductButton onClick={handleClose}>Cancel</DeleteProductButton>
            <EditProductButton type='submit'>submit</EditProductButton>
            </Form>
          </Box>
          
  }
        </Modal>
      </div>
    );
  }