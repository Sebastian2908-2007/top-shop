import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Menu, Button, MenuItem } from '@mui/material';
import CartItem from './CartItem';
import { checkoutAdd2CartBtnStyle } from '../styles/commonMuiStyles/muiButtonStyles';
import { useStoreContext } from '../utils/Globalstate';



const Cart = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [ state, dispatch ] = useStoreContext();
    const { cart } = state;
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    const ITEM_HEIGHT = 48;
 
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
     {  cart.length ?  ( 
        cart.map(item => (
        <CartItem key={item._id} item={item}/>
       ))):(<div>Nothing in cart</div>)
       }

       <MenuItem><Button sx={checkoutAdd2CartBtnStyle}>Checkout</Button></MenuItem>
    </Menu>
    </div>
    );
};

export default Cart;