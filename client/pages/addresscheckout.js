import dynamic from "next/dynamic";
const AddressForm = dynamic(() =>import( '../components/AddressForm'),{ssr: false});

const addressCheckout = () => {
 

    return(
    <AddressForm/>
    )
};

export default addressCheckout;