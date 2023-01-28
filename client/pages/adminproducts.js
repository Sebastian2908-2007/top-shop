import { useState, useEffect } from 'react';
 /**import useQuery so we can query for products */
 import { useQuery } from "@apollo/client";
 import { NoProductDiv } from '../styles/Div.styled';
 /**import the products query*/
 import { GET_ALL_PRODUCTS } from "../utils/queries";
 import ProductCard from "../components/ProductCards";
import { AdminProductPageSection } from "../styles/Section.styled";
/**import the edit and delete modal*/
import EditDeleteModal from '../components/EditDeleteModal';
/**grid components mui*/
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

/**get modal madal will depend on three props
 * one prop for opening and closing
 * one prop for telling it whether this is an edit or delete
 * one prop that gives it the information it needs
 */
 export default function AdminProductsPage () {
    /**this state opens edit delete modal it is passed to the modal as well as the product cards*/
    const [open, setOpen] = useState(false);
    /**modal info this state will hold the information I need to either delete or edit a product it will be set in product card
     * its passed to both modal and product card
     */
    const [modalInfo,setModalInfo] = useState({});
    /**query for products*/
    const {loading,data} = useQuery(GET_ALL_PRODUCTS);
    /**if query is not finished display loading */
if(loading) {
    return (
        <div>loading...</div>
    );
}
/**turn data into a products variable for ease of use */
const products = data.getProducts;
return (
    /**if stuff is not loading display all products */
    <AdminProductPageSection>
        <EditDeleteModal open={open} setOpen={setOpen}
        setModalInfo={setModalInfo} modalInfo={modalInfo}
        />
        <Box>
      <Grid container rowSpacing={{xs:3,md:4}} columnSpacing={{xs:0,sm:4,md:4}} >
{products.length ? (  products.map(product => (
  
  <Grid item xs={12} sm={6} lg={4} xl={3}   key={product._id}>
    <ProductCard product={product}  setOpen={setOpen}
    setModalInfo={setModalInfo}/>
  </Grid>
))):(<NoProductDiv>no products yet</NoProductDiv>)}
      </Grid>
      </Box>
</AdminProductPageSection>
  
);

 };
