/**head is for keywords meta tags etc.*/
//import Head from 'next/head'
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import CategoryList from '../components/CategoryList';
import { useEffect } from 'react';
import { HomeHeroPic } from '../styles/Images.styled';
import { HomeHeroSection,ProductSection } from '../styles/Section.styled';
import ProductCard from '../components/ProductCards';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS_HOMEPAGE } from '../utils/queries';
import { MainTitle } from '../styles/H1.styled';
/**import state and dispatch basically */
import { useStoreContext } from '../utils/Globalstate';
/**grid components mui*/
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { UPDATE_PRODUCTS } from '../utils/actions';
import { NoProductDiv } from '../styles/Div.styled';
/**grid components mui */
//import { initializeApollo } from '../lib/apolloClient'

export default function Home() {
  const [state, dispatch] = useStoreContext();
  const {loading,data} = useQuery(GET_ALL_PRODUCTS_HOMEPAGE);
  /***destructure current category from state*/
  const { currentCategory } = state;
 
/**add products to the global state */
useEffect(() => {
if(data) {
  dispatch({
    type: UPDATE_PRODUCTS,
    products: data.getProducts
  });
}
},[loading,dispatch]);



   /**get data from global state and store in products variable*/
   const products = state.products;
   function filterProducts() {
     if(!currentCategory) {
      return products;
     }

     return products.filter(
      product => product.category._id === currentCategory
     );
   };

  return (
    <div>
     <HomeHeroSection>
     <HomeHeroPic 
     src='/sybs-banner1024.jpg'
     srcSet='/sybs-banner1024.jpg 1024w, /sybs-banner1280.jpg 1280w, /sybs-banner2500.jpg 2500w'
     />
     </HomeHeroSection>
     <ProductSection>
      <MainTitle>Buy Handmade Crafts Online</MainTitle>
      <CategoryList/>
      <Box>
      <Grid container rowSpacing={{xs:3,md:4}} columnSpacing={{xs:0,sm:4,md:4}} >
{products.length ? (  filterProducts().map(product => (
  
  <Grid item xs={12} sm={6} lg={4} xl={3}   key={product._id}>
    <ProductCard product={product}/>
  </Grid>
))):(<NoProductDiv>no products yet</NoProductDiv>)}
      </Grid>
      </Box>
   
     </ProductSection>
    </div>
  )
}

/* Gonna keep this for ref for now but I see no reason to query products serverside
if using this pass products to component as props
export async function getStaticProps() {
  const apolloClient = initializeApollo();
 const data = await apolloClient.query({
    query: GET_ALL_PRODUCTS_HOMEPAGE,
  });
  return {
    props: {
      products:data
    }
  }
};*/
