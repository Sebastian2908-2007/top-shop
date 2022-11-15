import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Menu, Button, MenuItem } from '@mui/material';
import CartItem from './CartItem';
import { checkoutAdd2CartBtnStyle } from '../styles/commonMuiStyles/muiButtonStyles';



const Cart = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const ITEM_HEIGHT = 48;
    /**checkout button style */
   /* const checkoutBtnStyle ={
      backgroundColor:' rgb(0,0,0,0.6)',
      color: 'rgb(248, 248, 128)',
      
      '&:hover': {backgroundColor:'rgba(0, 0, 0)'}
      
    };*/
    /**more cart icon styles */
const cartIconStyle = theme => ({ 
  color:'rgb(248, 248, 128)',
  fontSize:'2rem',
  [theme.breakpoints.up('md')]:{
      fontSize: '3rem'
  }

});
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
       <CartItem/> 
       <CartItem/> 
       <CartItem/> 
       <CartItem/> 
       <CartItem/> 
       <CartItem/> 
       <CartItem/> 
       <MenuItem><Button sx={checkoutAdd2CartBtnStyle}>Checkout</Button></MenuItem>
    </Menu>
    </div>
    );
};

export default Cart;