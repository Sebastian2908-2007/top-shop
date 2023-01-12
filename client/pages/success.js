import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../utils/mutations';
import { useStoreContext } from '../utils/Globalstate';
import OrderItem from '../components/OrderItem';
import { SuccessSection } from '../styles/Section.styled';
import { SuccessTitle } from '../styles/H1.styled';
import { SuccessOrderParagrapgh } from '../styles/P.styled';
import clientDatabase from '../utils/dexiedb';
import { useEffect } from 'react';

const Success = () => {
    const [ state, dispatch ] = useStoreContext();
    const [addOrder] = useMutation(ADD_ORDER);
    const {cart} = state;
useEffect(() => {
    const saveOrder = async () => {
      /**get cart products from global state */
      const products = cart.map(product => product._id);
      if(products.length) {
      try{
        /**add the order to our db*/
       await addOrder({
          variables:{products}
        });
        /**clear dexie db aka indexedDb*/
       await clientDatabase.cart.clear();
       /**in ten seconds re reoute to home page*/
       setTimeout(() => { window.location.assign('/');},10000)
      }catch(e){
        console.log('ADD ORDER ERR',e);
      }
    }
      
    };
    saveOrder();
    /**cart is in dependncy array because initially it is empty since it has not been updated yet*/
  },[addOrder,cart]);
    

    return  (
        <SuccessSection>
          <SuccessTitle>Thanks For your Order!</SuccessTitle>
          <SuccessOrderParagrapgh>You will soon be re-routed. View past orders via the options menu. Have a fantastic day!</SuccessOrderParagrapgh>
          { 
           cart.map(item => (
                <OrderItem key={item._id} item={item}/>
            ))
          }
            </SuccessSection>
    )
    
};


export default Success;