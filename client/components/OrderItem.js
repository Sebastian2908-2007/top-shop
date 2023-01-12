import { OrderItemDiv,OrderItemInfoDiv } from "../styles/Div.styled";
import { OrderItemPic } from "../styles/Images.styled";
const OrderItem = ({item}) => {
    return (
  <OrderItemDiv>
    <OrderItemInfoDiv>{item.name}</OrderItemInfoDiv>
    <OrderItemInfoDiv>${item.price}</OrderItemInfoDiv>
    <OrderItemInfoDiv>{item.description}</OrderItemInfoDiv>
    <OrderItemPic src={item.image.Location}/>
  </OrderItemDiv>
    )
};

export default OrderItem;