import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';
import { AdminDashboardLink, UserOrdersLink } from '../styles/Links.styled';
import auth from '../utils/auth';
import { MenuLogoutButton } from '../styles/Button.styled';






export default function NavMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 /**style for menu Items */
const menuItemStyles = {
    fontFamily: ['Dancing Script'],
    fontSize: '1.3rem',
    color: 'rgb(0, 119, 255)',
    textShadow: '0 0 1px black' ,
      '&:hover': {
    color: 'rgb(254, 114, 53)'
  }
};
/**more vert icon styles */
const vertIconStyle = theme => ({ 
  color:'rgb(0, 119, 255)',
  fontSize:'2rem',
  [theme.breakpoints.up('md')]:{
      fontSize: '3.5rem'
  }

});
/**text menu options for non logged in user second item in each array is used for routing in next/link A.K.A <Link>*/
 const menuOptions = [
    ["About","/about"],
    ["Blog","/blog"],
    ["login","/login"],
    ["new account","/newuser"],
    ["Reviews","/reviews"]
 ];

 /**menu options for logged in user */
 const loggedInMenuOptions = [
  ["About","/about"],
  ["Blog","/blog"],
  ["Reviews","/reviews"]
 ];

 
  return (
    <div>
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon sx={vertIconStyle}/>
      </IconButton>
     
      <Menu
        id="basic-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            width: 'auto',
            backgroundColor:'rgb(0, 195, 255)',
          },
        }}
      >
        {/**if logged in display loggedinmenuoptions if not display"menuOptions' */}
       {auth.loggedIn() ? (
        
            loggedInMenuOptions.map((menuOption) => (
              <MenuItem  key={menuOption} sx={menuItemStyles} onClick={handleClose}>
              <Link href={menuOption[1]}>{menuOption[0]}</Link>
            </MenuItem>
            ))
          ):( 
       menuOptions.map((menuOption) => (   
        <MenuItem  key={menuOption} sx={menuItemStyles} onClick={handleClose}>
          
          <Link href={menuOption[1]}>{menuOption[0]}</Link>
        </MenuItem>
          )) 

          )
            }    
       {/**menu options teranary ends */}   
     {auth.loggedIn() ? 
     (  
     <MenuItem>
     <MenuLogoutButton onClick={() => auth.logout()}>Logout</MenuLogoutButton>
     </MenuItem>
     ):(null) 
     }
     {
     auth.loggedIn() && auth.getProfile().data.isAdmin ?
       (<MenuItem style={menuItemStyles}><AdminDashboardLink href='/admindashboard'>Dashboard</AdminDashboardLink></MenuItem>):(null)
     }
     {
     auth.loggedIn() && !auth.getProfile().data.isAdmin ?
       (<MenuItem style={menuItemStyles}><UserOrdersLink href='/usersdetails'>Orders</UserOrdersLink></MenuItem>):(null)
     }
      </Menu>
    </div>
  );
}