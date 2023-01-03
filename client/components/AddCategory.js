import { useState, useEffect } from "react";
import {useMutation} from '@apollo/client';
/**import mutation to add and delete a category */
import { ADD_CATEGORY, DELETE_CATEGORY } from "../utils/mutations";
/**imported styled components */
import { CurrentCategoryDiv } from "../styles/Div.styled";
import { AdminCategoryButton } from "../styles/Button.styled";
import { AdminSectionTitle } from "../styles/H2.styled";
import { AdminSubTitle } from "../styles/H3.styled";
import { CarouselAdminSection, AdminCategoriesSection } from "../styles/Section.styled";
import { AdminForm, AdminFormInput,AdminFormButton } from "../styles/Forms.styled";
/**imported styled components end */
/**import mui icon */
import ClearIcon from '@mui/icons-material/Clear';
import DeleteErrorModal from "./DeleteErrorModal";
/**these props come in from data queried in adminDashboard its passed because products component also needs this data */
const AddCategory = ({data,refetch,loading}) => {
    /**clear icon styles*/
    const clearIconStyle = {
        fontSize:{xs:'1rem',sm:'1.5rem'},fontWeight:'bold',transform:'translate(55%,-26%)',
        color:'rgb(245 245 6)','&:hover':{color:'rgb(170, 74, 68)'}
        
    }
  
    /**name use mutation function and destructure error from use mutation hook */
    const [addCategory,{error}] = useMutation(ADD_CATEGORY);
    /**name mutation that wil delete a category */
    const [deleteCategory] = useMutation(DELETE_CATEGORY);
    /**create the state for the add category data */
    const [categoryFormData,setCategoryFormData] = useState({name:''});
    /*state for category delete error*/
    const [categoryDeleteError,setCategoryDeleteError] = useState('');
    /**state to open delete error modal*/
    const [open, setOpen] = useState(false);
    /**funtion to set category data state */
    const onFormChange = (event) => {
        /**destructure name and value from the event target*/
        const {name,value} = event.target;
      /*set the form state*/
        setCategoryFormData({
            [name]:value
        })
    };

    /**function that will submit our form data when form is submitted */
    const submitNewCategory = async (event) => {
       event.preventDefault();
       try{
        await addCategory({variables:{name: categoryFormData.name}});
        /**clear form input*/
        document.getElementById('category-form').reset();
        /**after successful mutation we will refetch the category data to update the UI */
        refetch();
        /**clear form state */
        setCategoryFormData({name:''});
       }catch(e){
       console.log(e);
       }

    };
    /**create function to delete a category on button click */
    const deleteCategoryOnClick = async (_id) => {
       try{
         await deleteCategory({variables:{_id: _id}});
         /**call refetch so UI can be updated if delete is successful*/
         refetch();
       }catch(e) {
        console.log(e);
        setCategoryDeleteError(e);
        setOpen(true);
       }
    };


    return(
        <CarouselAdminSection>
          <DeleteErrorModal 
           open={open}
           setOpen={setOpen}
           categoryDeleteError={categoryDeleteError}
           setCategoryDeleteError={setCategoryDeleteError}
           />
        <AdminSectionTitle>Add Categories</AdminSectionTitle>
        <AdminForm id='category-form' onSubmit={submitNewCategory}>
            <AdminFormInput name='name' onChange={onFormChange}/>
            <AdminFormButton type="submit">Add Category</AdminFormButton>
        </AdminForm>
        <AdminCategoriesSection>
         <AdminSubTitle>Current Categories</AdminSubTitle>   
         <CurrentCategoryDiv>
         {loading ? (<div>loading...</div>):( 
           data.getCategories.map(category => (
            <AdminCategoryButton onClick={() =>{deleteCategoryOnClick(category._id)}} key={category._id}>{category.name}<ClearIcon sx={clearIconStyle}/></AdminCategoryButton>
           ))    )
         }
         </CurrentCategoryDiv>
        </AdminCategoriesSection>
        </CarouselAdminSection>
    );
};

export default AddCategory;