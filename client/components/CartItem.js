import { MenuItem } from "@mui/material";
import { MenuItemMainDiv,MenuItem2MainDiv,CartImgDiv,QtyInputTrashDiv, ProductPriceDiv, ProductCartNameDiv} from "../styles/Div.styled";
import { ProductPriceSpan } from "../styles/Spans.styled";
import { CartPic } from "../styles/Images.styled";
import { CartInput } from "../styles/Input.styles";
import { CartTrashSpan } from "../styles/Spans.styled";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useStoreContext } from '../utils/Globalstate';
import { REMOVE_FROM_CART,  UPDATE_CART_QUANTITY } from "../utils/actions";
/**import my dexie singleton so that I can do delete cart items from local db as well as update purchase quantity if needed*/
import clientDatabase from '../utils/dexiedb';

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
    purchaseQuantity,
    _id
  } = item;

  /**destructure location from image data that was destructured from incoming item data */
 const {Location} = image;

 /**function to remove items from cart */
 const removeFromCart = () => {
   /**DELETES PRODUCT FROM INDEXEDDB*/
   clientDatabase.cart.delete(_id);
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
      /**DELETES PRODUCT FROM INDEXEDDB*/
      clientDatabase.cart.delete(_id);
  }else {
    /**below if keeps error from going off this still throws a warning when value
     *  is momentarily absent the problen is the empty value '?' being fed to input value*/
    if(value === '') {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: '?'
    });
      return;
    }
      dispatch({
          type: UPDATE_CART_QUANTITY,
          _id: _id,
          purchaseQuantity: parseInt(value)
      });
      /**below updates indexedDb in particular the purchaseQuantity field*/
      clientDatabase.cart.update(_id,{purchaseQuantity:parseInt(value)});
  }
};

return (
    <MenuItem style={menuItemStyle}>
    <MenuItemMainDiv>
      <CartImgDiv>
        <CartPic
        src={Location}
        alt="cart item"
        width={60}
        height={60}
        layout='intrinsic'
        />
      </CartImgDiv>
      <MenuItem2MainDiv>
      <ProductCartNameDiv>{name}</ProductCartNameDiv>
       <ProductPriceDiv><ProductPriceSpan>${price}</ProductPriceSpan></ProductPriceDiv> 
        <QtyInputTrashDiv>
            <span>Qty</span>
         <CartInput
          type="number"
          placeholder={purchaseQuantity}
         value={purchaseQuantity}
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