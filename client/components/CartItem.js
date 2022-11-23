import { MenuItem } from "@mui/material";
import { MenuItemMainDiv,MenuItem2MainDiv,CartImgDiv,QtyInputTrashDiv, ProductPriceDiv, ProductCartNameDiv} from "../styles/Div.styled";
import { ProductPriceSpan } from "../styles/Spans.styled";
import { CartPic } from "../styles/Images.styled";
import { CartInput } from "../styles/Input.styles";
import { CartTrashSpan } from "../styles/Spans.styled";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useStoreContext } from '../utils/Globalstate';
import { REMOVE_FROM_CART,  UPDATE_CART_QUANTITY } from "../utils/actions";

const menuItemStyle = {
    width:'75%'
};

const CartItem = ({ item }) => {
  const [ state, dispatch ] = useStoreContext();
/**destructure incoming cart item data */
  const {
    image,
    name,
    price,
    /**will not need quantity here */
    quantity,
    _id
  } = item;

  /**destructure location from image data that was destructured from incoming item data */
 const {Location} = image;

 /**function to remove items from cart */
 const removeFromCart = () => {
  dispatch({
    type: REMOVE_FROM_CART,
    _id: _id
  })
 };
 
 /**function to update the item quantity as well as remove item from cart if number is zero in input box */
 const onChange = (e) => {
  const value = e.target.value;

  if (value === '0' ) {
      dispatch({
          type: REMOVE_FROM_CART,
          _id: _id
      });
  }else {
      dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: _id,
          quantity: parseInt(value)
      });
  }
};

return (
    <MenuItem style={menuItemStyle}>
    <MenuItemMainDiv>
      <CartImgDiv>
        <CartPic
        src={Location}
        alt="cart item"
        />
      </CartImgDiv>
      <MenuItem2MainDiv>
      <ProductCartNameDiv>{name}</ProductCartNameDiv>
       <ProductPriceDiv><ProductPriceSpan>${price}</ProductPriceSpan></ProductPriceDiv> 
        <QtyInputTrashDiv>
            <span>Qty</span>
         <CartInput
          type="number"
          placeholder={quantity}
          value={quantity}
          onChange={onChange}
         />
         <CartTrashSpan
         role="img"
         aria-label="trash"
         onClick={removeFromCart}
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