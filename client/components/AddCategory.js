import { useState, useEffect } from "react";
import {useQuery, useMutation} from '@apollo/client';
import { AdminSectionTitle } from "../styles/H2.styled";
import { AdminSubTitle } from "../styles/H3.styled";
import { CarouselAdminSection, AdminCategoriesSection } from "../styles/Section.styled";
import { AdminForm, AdminFormInput,AdminFormButton } from "../styles/Forms.styled";
import { GET_CATEGORIES } from "../utils/queries";
import { CurrentCategoryDiv } from "../styles/Div.styled";
import { AdminCategoryButton } from "../styles/Button.styled";
/**mui icon */
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ClearIcon from '@mui/icons-material/Clear';
const AddCategory = () => {
    const {loading,data} = useQuery(GET_CATEGORIES);
    return(
        <CarouselAdminSection>
        <AdminSectionTitle>Add Categories</AdminSectionTitle>
        <AdminForm>
            <AdminFormInput/>
            <AdminFormButton>Add Category</AdminFormButton>
        </AdminForm>
        <AdminCategoriesSection>
         <AdminSubTitle>Current Categories</AdminSubTitle>   
         <CurrentCategoryDiv>
         {loading ? (<div>loading...</div>):( 
           data.getCategories.map(category => (
            <AdminCategoryButton key={category._id}>{category.name}<ClearIcon sx={{fontSize:'1rem',fontWeight:'bold',transform:'translate(55%,-26%)',color:'rgb(245 245 6)','&:hover':{color:'rgb(170, 74, 68)'}}}/></AdminCategoryButton>
           ))    )
         }
         </CurrentCategoryDiv>
        </AdminCategoriesSection>
        </CarouselAdminSection>
    );
};

export default AddCategory;