import { useState, useEffect } from 'react';
 /**import useQuery so we can query for products */
 import { useQuery } from "@apollo/client";
 /**import the products query*/
 import { GET_ALL_PRODUCTS } from "../utils/queries";
 import ProductCard from "../components/ProductCards";
import { AdminProductPageSection } from "../styles/Section.styled";
/**grid components mui*/
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


 export default function AdminProductsPage () {
    /**query for products*/
    const {loading,data,refetch} = useQuery(GET_ALL_PRODUCTS);
    /**if query is not finished display loading */
if(loading) {
    return (
        <div>loading...</div>
    );
}
/**turn data into a products variable for ease of use */
const products = data.getProducts;
console.log(products); 
return (
    /**if stuff is not loading display all products */
    <AdminProductPageSection>
        <Box>
      <Grid container rowSpacing={{xs:3,md:4}} columnSpacing={{xs:0,sm:4,md:4}} >
{products.length ? (  products.map(product => (
  
  <Grid item xs={12} sm={6} lg={4} xl={3}   key={product._id}>
    <ProductCard product={product}/>
  </Grid>
))):(<NoProductDiv>no products yet</NoProductDiv>)}
      </Grid>
      </Box>
</AdminProductPageSection>
  
);

 };
 /** 
   auth.loggedIn() && auth.getProfile().data.isAdmin ? (<AdminProductPageSection>
        {products.map(product => (
            <ProductCard key={product._id} product={product}/>
        ))}
    </AdminProductPageSection>):(<div>no admin</div>)


       <AdminProductPageSection>
        {products.map(product => (
            <ProductCard key={product._id} product={product}/>
        ))}
    </AdminProductPageSection>

 */