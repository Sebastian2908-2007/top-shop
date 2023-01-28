import { useState, useEffect } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Card } from '@mui/material';
import { checkoutAdd2CartBtnStyle } from '../styles/commonMuiStyles/muiButtonStyles';
import { useStoreContext } from '../utils/Globalstate';
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from '../utils/actions';
import { ProductPriceSpan } from '../styles/Spans.styled';
/**import token functionality to use for conditionals */
import auth from '../utils/auth';
/**styled components related only to admin functionality start */
import { ProductCardCategoryDiv,AdminProductBtnDiv, CardImageDiv } from '../styles/Div.styled';
import { AdminItemNameSpan } from '../styles/Spans.styled';
import { DeleteProductButton, EditProductButton } from '../styles/Button.styled';
/**styled components related only to admin functionality end*/
/**this is dexie singleton import this allows us to work easily with indexedDB*/
import clientDatabase from '../utils/dexiedb';
import Image from 'next/legacy/image';

/**although this is the same component used on the homepage certain data will not be accessible there for the
 * admin namely category name also even if delete button shows the key and bucket properties will not be present
 * because as of now the queries that feed the card on each page differ I will probably need to do something about this 
 * but im taking note of the issue here for now
 */

export default function ProductCard({product,setOpen,setEditOrDelete,setModalInfo}) {
  /**here we declare an empty variable that will be set to true or false if a user is logged in
   * and is or isnt an admin if nobody is logged in its just set false
   */
  let isAdmin;
  /**this if statement sets isAdmin variable*/
  if(auth.loggedIn()) { 
  isAdmin = auth.getProfile().data.isAdmin;
  }else{
    isAdmin = false
  };

  /**this is state for the text that resides in the product item buttons so that it can be changed when adding to cart */
  const [crtBtnTxt, setCrtBtnTxt] = useState('Add To Cart');
  /**destructure product */
  const {
    description,
    image,
    name,
    price,
    quantity,
    _id
  } = product;
  /**destructure Location from image that is nested in the product */
  const {
Location,
Bucket,
Key
  } = image;


  /**destructure watch basically is useReducer for state and dispatch access */
  const [state,dispatch] = useStoreContext();
  /**destructure cart from state */
  const { cart } = state;

  /**this function adds to the cart and updates the global state with a product */
  const addToCart = () => {
   const isItemInCart = cart.find((cartItem) => cartItem._id === _id);
   if(isItemInCart) { 
    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: _id,
      purchaseQuantity: parseInt(isItemInCart.purchaseQuantity) + 1
    });
    /**below updates indexedDb in particular the purchaseQuantity field*/
    clientDatabase.cart.update(_id,{purchaseQuantity:parseInt(isItemInCart.purchaseQuantity) + 1});
    /**this sets button text momentarily when an item is added twice*/
    setCrtBtnTxt('quantity updated !');
    setTimeout(() => {setCrtBtnTxt('Add To Cart')},3000)
   }else { 
    dispatch({
      type: ADD_TO_CART,
      /**purchaseQuantity is not on data from db its created right here for the global state */
      product: { ...product, purchaseQuantity: 1 }
    });
    /**adds our product to indexedDb*/
    clientDatabase.cart.add({_id: _id,name:name,description:description,price:price,image:{Location:Location},purchaseQuantity:1});
    /**this sets button text momentarily when an item is added*/
    setCrtBtnTxt('Added to cart!');
    setTimeout(() => {setCrtBtnTxt('Add To Cart')},3000)
  }
  };

  /**delete product function to open modal and set relivent data FUNCTION ONLY RELIVANT WHEN USER IS AN ADMIN*/
  const deleteProduct = () => {
    setOpen(true);
   // setEditOrDelete('delete');
    setModalInfo({_id:_id,Bucket:Bucket,Key:Key,itemType:'product',EditOrDelete:'delete'});
  };

  /**edit product function to open modal and set relivent data FUNCTION ONLY RELIVANT WHEN USER IS AN ADMIN*/
  const editProduct = () => {
    setOpen(true);
    //setEditOrDelete('edit');
    setModalInfo({_id:_id,name:name,description:description,price:price,quantity:quantity,itemType:'product',EditOrDelete:"edit"});
  };

  
  return (
    <Card sx={
      { 
        boxShadow:' 0 0 10px rgb(0,0,0)',
        height:{xs:"auto",sm:'100%'},
        maxWidth: '100%',
       // backgroundColor: "rgb(255,255,255,0.6)",
       background:'linear-gradient(to left, rgb(0, 119, 255),rgb(0,0,0,0.7))',
       
        border: '1px solid rgb(0,0,0)',
        display:"flex",
        flexDirection:"column",
       justifyContent:'space-between'
      }
            }>
      {/*<CardMedia
        component="img"
        alt={product.name}
        height="140"
        image={Location}
        sx={
          {
          objectFit:'fill',
          height:'50%',
          '@media screen and (min-width:768px )': {
            height:'40%'
          }
        }
        }
      />*/}
      <div>
      <Image
         src={Location}
         alt={product.name}
         width={600}
         height={600}
         layout='intrinsic'
      />
      </div>
      <CardContent sx={{display:'flex', flexDirection:'column',alignItems:'center',justifyContent:'space-between',height:'25%'}} >
        {isAdmin && <ProductCardCategoryDiv>Category: {product.category.name}</ProductCardCategoryDiv>}
        <Typography gutterBottom variant="h5" component="div" 
        sx={{
        textShadow: '0 0 10px rgb(254, 167, 53)',
       padding:'2%',
        fontSize:{xs:'1.5rem',xl:'1.8rem'},
        background: 'linear-gradient(to right, rgb(254, 114, 53),rgb(0,0,0))',
        color:'rgb(252, 245, 239)',
        border: '2px solid black',
        textShadow: '0 0 10px rgb(254, 167, 53)',
        fontFamily:'sans-serif'
        }}>
         {isAdmin && <AdminItemNameSpan>Product Name:</AdminItemNameSpan>} {name}
        </Typography>
        <Typography variant="body2" color="text.secondary"
         sx={{textShadow: '0 0 10px rgb(254, 167, 53)',
         //background:'linear-gradient(to left, rgb(0, 119, 255),rgb(0,0,0,0.7))',
         backgroundColor: "rgb(255,255,255,0.6)",
         padding:"2%",
         color:'rgb(252, 245, 239)',
        // color:'black',
         border: '1px solid rgb(254, 114, 53)',
         borderRadius:'8px',
         textShadow: '0 0 10px rgb(254, 114, 53)',
         boxShadow:  '0 0 10px black',
         fontWeight:'bolder',
         fontFamily:'sans-serif',
         fontSize:{xs:'1.3rem',xl:'1.5rem'}}}>
        {isAdmin && <AdminItemNameSpan>Product description:</AdminItemNameSpan>} {description}
        </Typography>
      </CardContent>
      <CardActions sx={{display:'flex', flexDirection:'column',alignItems:'center'}}>
      <ProductPriceSpan padding='3%' marginBottom='.55em'>
      {isAdmin && <AdminItemNameSpan>Product Price:</AdminItemNameSpan>} ${price}
      </ProductPriceSpan>
      {/**Below if not admin display regular button for checkout */}
      {!isAdmin ? (<Button size="small" sx={checkoutAdd2CartBtnStyle} onClick={addToCart}>{crtBtnTxt}</Button>):(null)}
       {/**Below if admin display edit and delete buttons for */}
      {isAdmin &&   <AdminProductBtnDiv><DeleteProductButton onClick={deleteProduct}>Delete</DeleteProductButton>
      <EditProductButton onClick={editProduct}>Edit</EditProductButton></AdminProductBtnDiv>}            
      {/*isAdmin &&   <EditProductButton>Edit</EditProductButton>*/}   
      </CardActions>
    </Card>
  );
}
/**
 
  {isAdmin ? (
       <EditDeleteProdBtnDiv>           
      <DeleteProductButton>Delete</DeleteProductButton>
      <EditProductButton>Edit</EditProductButton>
      <EditDeleteProdBtnDiv/>
      ) 
        :(<Button size="small" sx={checkoutAdd2CartBtnStyle} onClick={addToCart}>{crtBtnTxt}</Button>)
      }

 */