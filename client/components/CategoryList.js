import { useEffect } from 'react';
import { CategoryDiv, NoCategoryDiv } from '../styles/Div.styled';
import { CategoryButton } from '../styles/Button.styled';
import { GET_CATEGORIES } from '../utils/queries';
import { useQuery } from '@apollo/client';
import { useStoreContext } from '../utils/Globalstate';
import { UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from '../utils/actions';

const CategoryList = () => {
    /** get global state and dispatch function from useStoreContext function from globalstate.js */
    const [state, dispatch] = useStoreContext();
    /* destructure category data out of the global state*/ 
    const { categories } = state;
    const {loading,data} = useQuery(GET_CATEGORIES);

    useEffect(() => {
        if(data) {
            dispatch({
                type: UPDATE_CATEGORIES,
                categories:data.getCategories
            });
        }
    },[loading,dispatch])
    
/**function to update the current category in our global state */
const setCurrentCategory = (currentCategory) => {
    dispatch({
        type: UPDATE_CURRENT_CATEGORY,
        currentCategory: currentCategory
    });
    
};

   return(
    <CategoryDiv>
{categories.map(category => (
    <CategoryButton key={category._id} onClick={() => {setCurrentCategory(category._id)}}>{category.name}</CategoryButton>
))}
{!categories.length ? <NoCategoryDiv>No Categories yet</NoCategoryDiv>:null}
    </CategoryDiv>
   );
};

export default CategoryList;