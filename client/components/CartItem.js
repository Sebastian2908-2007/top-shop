import { MenuItem } from "@mui/material";
import { MenuItemMainDiv,MenuItem2MainDiv,CartImgDiv,QtyInputTrashDiv} from "../styles/Div.styled";
import { CartPic } from "../styles/Images.styled";
import { CartInput } from "../styles/Input.styles";
import { CartTrashSpan } from "../styles/Spans.styled";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const menuItemStyle = {
    width:'75%'
};

const CartItem = ({ item }) => {
return (
    <MenuItem style={menuItemStyle}>
    <MenuItemMainDiv>
      <CartImgDiv>
        <CartPic
        src='/fakecartimg.png'
        alt="cart item"
        />
      </CartImgDiv>
      <MenuItem2MainDiv>
        <div>wreath, $100</div>
        <QtyInputTrashDiv>
            <span>Qty</span>
         <CartInput
          type="number"
          placeholder="1"
         />
         <CartTrashSpan
         role="img"
         aria-label="trash"
         >
       <DeleteForeverIcon/>
         </CartTrashSpan>
        </QtyInputTrashDiv>
      </MenuItem2MainDiv>
    
    </MenuItemMainDiv>
    </MenuItem>
);
};

export default CartItem;