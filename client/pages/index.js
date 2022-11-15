/**head is for keywords meta tags etc.*/
//import Head from 'next/head'
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import { HomeHeroPic } from '../styles/Images.styled'
import { HomeHeroSection,ProductSection } from '../styles/Section.styled'
import ProductCard from '../components/ProductCards'
import { useQuery } from '@apollo/client'
import { GET_ALL_PRODUCTS_HOMEPAGE } from '../utils/queries'
import { MainTitle } from '../styles/H1.styled'
/**grid components mui*/
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
/**grid components mui */
//import { initializeApollo } from '../lib/apolloClient'

export default function Home() {
  
  const {loading,data} = useQuery(GET_ALL_PRODUCTS_HOMEPAGE);
  if (loading) {
    return (
    <div>loading</div>
  )
    }; 
 console.log(data);
 /**get data and store in products variable products from data */
const products = data.getProducts;

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
      <Box>
      <Grid container rowSpacing={{xs:2,sm:3,md:4}} columnSpacing={{xs:0,sm:4,md:4}} >
{products.map(product => (
  
  <Grid item xs={12} sm={6} xl={3}   key={product._id}>
    <ProductCard product={product}/>
  </Grid>
))}
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
