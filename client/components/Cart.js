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

/**stripe pub key*/
const stripePromise = loadStripe(  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

const Cart = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [ state, dispatch ] = useStoreContext();
    const { cart } = state;
     // useLazyQuery for doing our checkout query on button click
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

  cart.forEach((item) => {
      for (let i = 0; i < item.purchaseQuantity; i++) {
          productIds.push(item._id);
      }
  });
  getCheckout({
   variables: { products: productIds }
  });
};

// if data var changes we will be redirected to stripe checkout page
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
     {  cart.length ?  ( 
      
        cart.map(item => (
        <CartItem key={item._id} item={item}/>
       ))
       
       ):(<div>Nothing in cart</div>)
       }
{cart.length ? ( 
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