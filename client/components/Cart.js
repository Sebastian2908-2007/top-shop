import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Menu, Button, MenuItem } from '@mui/material';
import CartItem from './CartItem';
import { checkoutAdd2CartBtnStyle } from '../styles/commonMuiStyles/muiButtonStyles';
import { useStoreContext } from '../utils/Globalstate';
import { QUERY_CHECKOUT } from '../utils/queries';
import {loadStripe} from '@stripe/stripe-js';
/**import reducer to add multiple items to the cart*/
import { ADD_MULTIPLE_TO_CART } from '../utils/actions';
/** import use live query to easily grab dexie db data in an array*/
import { useLiveQuery } from 'dexie-react-hooks';
/**import dexie aka indexedDb functionality*/
import clientDatabase from '../utils/dexiedb';


/**stripe pub key*/
const stripePromise = loadStripe(  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [ state, dispatch ] = useStoreContext();
    const [globalCartUpdate,setGlobalCartUpdate] = useState(null);
    /**this gets all items in the dexie cart aka indexedDb var is used because its not block scoped*/
    var clientCart = useLiveQuery(() =>  clientDatabase.cart.toArray(),[]);
     /* useLazyQuery for doing our checkout query on button click*/
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const ITEM_HEIGHT = 48;
 
const cartIconStyle = theme => ({ 
  color:'rgb(0, 119, 255)',
  fontSize:'2rem',
  [theme.breakpoints.up('md')]:{
      fontSize: '3rem'
  }

});

/**function to calculate the total */
function calculateTotal() {
  let sum = 0;
  state.cart.forEach(item => {
      sum += item.price * item.purchaseQuantity;
  });
  // toFixed will set the number of digits to appear after decimal point
  return sum.toFixed(2);
};

const submitCheckout = () => {
  const productIds = [];

  state.cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
          productIds.push(item._id);
      }
  });
  getCheckout({
   variables: { products: productIds }
  });
};

  // function to check if there's anything in the state's cart property on load. If not, we'll retrieve data from the IndexedDB cart object store. 
 useEffect(() => {
    async function getCart() {
      /**here we make a blockScoped variable for our dexie cart array this is done because useLiveQuery cannot be used in this context*/
   const cart = clientCart;
      if(cart) {
        /**add dexie cart to global cart if it exists for instance on a refresh or connection loss */
        dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
        /**this causes a re render so cart items can be visually displayed*/
        setGlobalCartUpdate(true);
    }
    };

    if(!state.cart.length) {
        getCart();
    }
}, [state.cart.length, dispatch,clientCart,globalCartUpdate]);

/*if data var changes we will be redirected to stripe checkout page*/
useEffect(() => {
  if (data) {
      stripePromise.then((res) => {
          res.redirectToCheckout({ sessionId: data.checkout.session });
      });
  }
}, [data]);


    return(
        <div>
        <IconButton
        id="basic-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
    <ShoppingCartIcon sx={cartIconStyle}/>
    </IconButton>
    <Menu
    id="long-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    PaperProps={{
      style: {
        maxHeight: ITEM_HEIGHT * 4.5,
        width: '31ch',
        backgroundColor:'rgb(248, 248, 128)',
      },
    }}
    >
     {  state.cart.length ?  ( 
      
        state.cart.map(item => (
        <CartItem key={item._id} item={item}/>
       ))
       
       ):(<div>Nothing in cart</div>)
       }
{state.cart.length ? ( 
<div>
<strong>Total: ${isNaN(calculateTotal()) ? '0': calculateTotal()}</strong>
<MenuItem><Button onClick={submitCheckout} sx={checkoutAdd2CartBtnStyle}>Checkout</Button></MenuItem>
</div>
)
:(null)}
      
    </Menu>
    </div>
    );
};

export default Cart;