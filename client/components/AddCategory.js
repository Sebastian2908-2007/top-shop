import { useState, useEffect } from "react";
import {useQuery, useMutation} from '@apollo/client';
/**import query to get categories */
import { GET_CATEGORIES } from "../utils/queries";
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


const AddCategory = () => {
    /**clear icon styles*/
    const clearIconStyle = {
        fontSize:{xs:'1rem',sm:'1.5rem'},fontWeight:'bold',transform:'translate(55%,-26%)',
        color:'rgb(245 245 6)','&:hover':{color:'rgb(170, 74, 68)'}
        
    }
    /**call category query refetch will happen when form is submitted*/
    const {loading,data,refetch} = useQuery(GET_CATEGORIES);
    /**name use mutation function and destructure error from use mutation hook */
    const [addCategory,{error}] = useMutation(ADD_CATEGORY);
    /**name mutation that wil delete a category */
    const [deleteCategory] = useMutation(DELETE_CATEGORY);
    /**create the state for the add category data */
    const [categoryFormData,setCategoryFormData] = useState({name:''});
    /**funtion to set category data state */
    const onFormChange = (e) => {
        /**destructure name and value from the event target*/
        const {name,value} = e.target;
      /*set the form state*/
        setCategoryFormData({
            [name]:value
        })
    };

    /**function that will submit our form data when form is submitted */
    const submitNewCategory = async (e) => {
       e.preventDefault();
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
        console.log(e)
       }
    };


    return(
        <CarouselAdminSection>
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