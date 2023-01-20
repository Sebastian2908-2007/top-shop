import dynamic from "next/dynamic";
const AddressForm = dynamic(() =>import( '../components/AddressForm'),{ssr: false});

const AddressCheckout = () => {
 

    return(
    <AddressForm/>
    )
};

export default AddressCheckout;