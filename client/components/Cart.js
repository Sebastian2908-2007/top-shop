import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Menu } from '@mui/material';
import CartItem from './CartItem';


const Cart = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    return(
        <div>
        <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        >
    <ShoppingCartIcon style={{ color:'rgb(248, 248, 128)',fontSize:'2rem' }}/>
    </IconButton>
    <Menu
    id="basic-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    >
       <CartItem/> 
    </Menu>
    </div>
    );
};

export default Cart;