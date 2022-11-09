import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';






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
    fontSize: '1.3rem'
};
/**more vert icon styles */
const vertIconStyle = theme => ({ 
  color:'rgb(248, 248, 128)',
  fontSize:'2rem',
  [theme.breakpoints.up('md')]:{
      fontSize: '3.5rem'
  }

});
/**text menu options for non logged in user second item in each array is used for routing in next/link A.K.A <Link>*/
 const menuOptions = [
    ["About","/about"],
    ["Blog","/blog"],
    ["login","/login"]
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
            width: '11ch',
            backgroundColor:'rgb(248, 248, 128)',
          },
        }}
      >
       {menuOptions.map((menuOption) => ( 
        <MenuItem  key={menuOption} style={menuItemStyles} onClick={handleClose}><Link href={menuOption[1]}>{menuOption[0]}</Link></MenuItem>
       ))}
       
      </Menu>
    </div>
  );
}