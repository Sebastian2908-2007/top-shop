import { MenuItem } from "@mui/material";
import { MenuItemMainDiv,MenuItem2MainDiv,CartImgDiv,QtyInputTrashDiv, ProductPriceDiv} from "../styles/Div.styled";
import { ProductPriceSpan } from "../styles/Spans.styled";
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
       <ProductPriceDiv><ProductPriceSpan>wreath, $100</ProductPriceSpan></ProductPriceDiv> 
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