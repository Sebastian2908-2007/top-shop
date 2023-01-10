/**import dexie to easily use indexedDb*/
import Dexie from 'dexie';

const clientDatabase =  new Dexie('topshop');
clientDatabase.version(1).stores({
    products: '_id,category,name,description,image,price,purchaseQuantity',
    categories: '_id,name',
    cart: '_id,name,description,price,image,purchaseQuantitiy'
});

export default clientDatabase;

 /**name description price image purchaseQuantitiy */