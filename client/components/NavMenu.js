import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';






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
/**text menu options for non logged in user */
 const menuOptions = [
    "About",
    "Blog",
    "login"
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
        <MoreVertIcon style={{ color:'rgb(248, 248, 128)' }}/>
      </IconButton>
     
      <Menu
        id="basic-menu"
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
        <MenuItem  key={menuOption} style={menuItemStyles} onClick={handleClose}>{menuOption}</MenuItem>
       ))}
       
      </Menu>
    </div>
  );
}