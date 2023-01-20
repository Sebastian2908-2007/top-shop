/**head is for keywords meta tags etc.*/
//import Head from 'next/head'
//import Image from 'next/image'
//import styles from '../styles/Home.module.css'
import { useState } from 'react';
import CategoryList from '../components/CategoryList';
import { useEffect } from 'react';
import { HomeHeroPic } from '../styles/Images.styled';
import { HomeHeroSection,ProductSection } from '../styles/Section.styled';
import ProductCard from '../components/ProductCards';
import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS} from '../utils/queries';
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
/**import the edit and delete modal*/
import EditDeleteModal from '../components/EditDeleteModal';

export default function Home() {
  const [state, dispatch] = useStoreContext();
 

    /**this state opens edit delete modal it is passed to the modal as well as the product cards*/
    const [open, setOpen] = useState(false);
    /**modal info this state will hold the information I need to either delete or edit a product it will be set in product card
     * its passed to both modal and product card
     */
    const [modalInfo,setModalInfo] = useState({});

    const {loading,data,refetch} = useQuery(GET_ALL_PRODUCTS);

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
},[loading,dispatch,data]);



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
     <EditDeleteModal open={open} setOpen={setOpen}
        setModalInfo={setModalInfo} modalInfo={modalInfo}
        refetch={refetch}/>

     <HomeHeroPic 
     src='/topshop-hero2.png'
     alt='a bunch of futuristic shopping scenes'
     width={1920}
     height={1080}
     //fill
     priority
     layout='responsive'
     />
     </HomeHeroSection>
     <ProductSection>
      <MainTitle>The #1 Shop Online</MainTitle>
      <CategoryList/>
      <Box>
      <Grid container rowSpacing={{xs:3,md:4}} columnSpacing={{xs:0,sm:4,md:4}} >
{products.length ? (  filterProducts().map(product => (
  
  <Grid item xs={12} sm={6} lg={4} xl={3}   key={product._id}>
    <ProductCard product={product}  setOpen={setOpen}
    setModalInfo={setModalInfo}/>
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
