import { useStoreContext } from '../utils/Globalstate';
import OrderItem from '../components/OrderItem';
import { SuccessSection } from '../styles/Section.styled';
import clientDatabase from '../utils/dexiedb';

const Success = () => {
    const [ state, dispatch ] = useStoreContext();
    const {cart} = state;
    console.log(cart);
    setTimeout(() => {
        window.location.assign('/');
        clientDatabase.cart.clear();
    },10000)
    return  (
        <SuccessSection>
          { 
           cart.map(item => (
                <OrderItem key={item._id} item={item}/>
            ))
          }
            </SuccessSection>
    )
    
};


export default Success;