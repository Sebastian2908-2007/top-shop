import { CategoryDiv } from '../styles/Div.styled';
import { CategoryButton } from '../styles/Button.styled';
import { GET_CATEGORIES } from '../utils/queries';
import { useQuery } from '@apollo/client';

const CategoryList = () => {
    const {loading,data} = useQuery(GET_CATEGORIES);

    if(loading) {
        return(
            <div>loading...</div>
        );
    }
   const categories = data.getCategories;
   return(
    <CategoryDiv>
{categories.map(category => (
    <CategoryButton key={category._id}>{category.name}</CategoryButton>
))}
    </CategoryDiv>
   );
};

export default CategoryList;