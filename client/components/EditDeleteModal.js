import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import Router from "next/router";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
/**import rating component for the review edit functionality*/
import { Rating } from '@mui/material';
/**import s3Delete function so s3images can be removed when a product is removed*/
import { s3Delete, s3Upload } from '../utils/s3';
/**import mutation to delete and edit a Product */
import { DELETE_PRODUCT, EDIT_PRODUCT,ADD_FILE } from '../utils/mutations';
/**styled components */
import { DeleteProductButton, EditProductButton } from '../styles/Button.styled';
import { EditDeleteForm } from '../styles/Forms.styled';
import { AdminTextArea, EditDeleteFormInput } from "../styles/Forms.styled";
import { AdminEditDeleteBtnDiv } from '../styles/Div.styled';
/**styled components end*/
import { GET_ALL_PRODUCTS, GET_BLOGPOSTS_ALL_DATA,GET_REVIEWS,GET_ALL_DATA_USERS } from '../utils/queries';
/*Mutation to delete and edit blogposts*/
import { DELETE_BLOGPOST, EDIT_BLOG_POST,DELETE_REVIEW,EDIT_REVIEW,DELETE_USER,ADMIN_EDIT_USER } from "../utils/mutations";
/**need switch cases in submit edit and delete clock functions that find out which mutation should be ran
 * based on modelInfo.itemType eventually there will be one for products blogposts
 * users and reviews so four different potential try catch blocks in each function "deleteClick & submitEdit"
 * respectively also we will conditionally render the UI based on the same piece of date modalInfo.itemType within the edit or delete
 * conditional which is already based of of modalInfo.EditOrDelete. eventually there will be a piece of UI for
 * editing and deleting products, blogposts, users, reviews all of this info will be set on button click functions related to each individual page
 * or parent component
 */
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
    bgcolor: 'rgb(0,0,0,.6)',
    border: '2px solid rgb(248, 248, 128)',
    boxShadow: 24,
  };
  
  export default function EditDeleteModal({
    open,
    setOpen,
    //setEditOrDelete,
    setHasLeftReview,
    setModalInfo,
    modalInfo,
    }) 

    {
      /**get our itemType for our data rendering and operations it will be set in useEffect with the modalInfo.itemType data*/
      const [itemType,SetItemType] = useState('');
       // state for rating component for editing a review
       //const [Ratingvalue, setRatingValue] = useState(modalInfo.rating);
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
/**name our delete review mutation for use here in the modal*/
const [deleteReview] = useMutation(DELETE_REVIEW,{
  refetchQueries:[{query: GET_REVIEWS}]
});
/**name mutation to edit review*/
const [editReview] = useMutation(EDIT_REVIEW,{
  refetchQueries:[{query:GET_REVIEWS}]
});
/**name mutation to delete a user*/
const [deleteUser] = useMutation(DELETE_USER,{
  /* below we refetch the reviews wit the get all user  query just in case a user had an associated review*/
  refetchQueries:[{query: GET_ALL_DATA_USERS},{query:GET_REVIEWS}]
});
/**name mutation to edit an user*/
const [editUser] = useMutation(ADMIN_EDIT_USER,{
  /* below we refetch the reviews wit the get all user  query just in case a user had an associated review*/
  refetchQueries:[{query: GET_ALL_DATA_USERS}]
});

    
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
       /**REVIEW LOGIC STARTS*/
       case 'review':
        console.log('your deleting a review!');
        console.log(modalInfo);
        await deleteReview({
          variables:{
            _id: modalInfo._id
          }
        });
        setHasLeftReview(false);
        handleClose();
        break;
       /**REVIEW LOGIC ENDS*/
       /**USER LOGIC STARTS*/
       case 'user':
        try{
          await deleteUser({
            variables:{_id: modalInfo._id}
          });
          console.log('Successful user delete');
          handleClose();
          setModalInfo({});
        }catch(e){
          console.log(e);
        };
        break;
       /**USER LOGIC ENDS*/

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
        console.log(modalInfo);
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
  /*REVIEW LOGIC BEGINS*/
  case 'review':
    await editReview({
      variables:{
        _id: modalInfo._id,
        rating: modalInfo.rating,
        reviewText: modalInfo.reviewText
      }
    });
    handleClose();
    break;
  /*REVIEW LOGIC ENDS*/
  /**USER LOGIC BEGINS*/
  case 'user':
    await editUser({
      variables: {
        _id: modalInfo._id,
        firstName: modalInfo.firstName,
        lastName: modalInfo.lastName,
        email: modalInfo.email
      }
    });
    console.log('this edit ran through successfully!!!');
    setOpen(false);
    setModalInfo({});
    break;
  /**USER LOGIC ENDS*/
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
            <Typography sx={{color:"rgb(248, 248, 128)",textAlign:'center',marginBottom:'11%',fontSize:'1.65rem'}} id="modal-modal-title" variant="h6" component="h2">
              {`Are you Sure you want to delete this ${itemType}?`}
            </Typography>
            <AdminEditDeleteBtnDiv width='100%'>
         <DeleteProductButton onClick={deleteClick}>yes</DeleteProductButton>
         <EditProductButton onClick={handleClose}>no</EditProductButton>
         </AdminEditDeleteBtnDiv>
            
          </Box>
          
            )
          :
          
          <Box sx={style}>
            <Typography sx={{color:"rgb(248, 248, 128)",textAlign:'center',marginBottom:'11%',fontSize:'1.65rem'}} id="modal-modal-title" variant="h6" component="h2">
              {` use this form to edit your ${itemType}`}
            </Typography>
            <EditDeleteForm transform='translateY(0%)'  onSubmit={submitEdit}>
              {itemType === 'product' &&
              <>
       <EditDeleteFormInput onChange={handleFormChange} name="name" placeholder='edit name'/>
       <EditDeleteFormInput onChange={handleFormChange} name="description" placeholder='edit description'/>
       <EditDeleteFormInput onChange={handleFormChange} type='number' name="price" placeholder='edit price'/>
       <EditDeleteFormInput onChange={handleFormChange} type='number' name="quantity" placeholder='edit quantity'/>
                </>
            }
            {itemType === 'blogpost' && 
            <>
            <EditDeleteFormInput  onChange={handleFormChange} name='title' placeholder='edit blog title'/>
            <AdminTextArea  onChange={handleFormChange}  name="blogText" placeholder="Blog Post Text"/>
            <EditDeleteFormInput  onChange={handleFileChange} type='file' name='blogPic' placeholder='edit blog picture'/>
            </>}
            {itemType === 'review' && 
            <>
            <Rating
            name="simple-controlled"
            value={modalInfo.rating}
            onChange={(event, newValue) => {
              setModalInfo({...modalInfo, rating: newValue});
              console.log(modalInfo.rating,'in rating');
            }}
            sx={{marginBottom:'.5rem'}}
            />
            <AdminTextArea  onChange={handleFormChange}  name="reviewText" placeholder={modalInfo.reviewText}/>
            
            </>}
            {itemType === 'user' && 
            <>
            <EditDeleteFormInput  onChange={handleFormChange} name='firstName' placeholder='edit user first name'/>
            <EditDeleteFormInput  onChange={handleFormChange} name='lastName' placeholder='edit user last name'/>
            <EditDeleteFormInput  onChange={handleFormChange} name='email' placeholder='edit user email'/>
            </>
            }
            <AdminEditDeleteBtnDiv width='100%'>
            <DeleteProductButton onClick={handleClose}>Cancel</DeleteProductButton>
            <EditProductButton type='submit'>submit</EditProductButton>
            </AdminEditDeleteBtnDiv>
            </EditDeleteForm>
          </Box>
          
  }
        </Modal>
      </div>
    );
  }