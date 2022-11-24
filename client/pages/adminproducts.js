import { useState, useEffect } from 'react';
 /**import useQuery so we can query for products */
 import { useQuery } from "@apollo/client";
 /**import the products query*/
 import { GET_ALL_PRODUCTS } from "../utils/queries";
 import ProductCard from "../components/ProductCards";
import { AdminProductPageSection } from "../styles/Section.styled";


 export default function AdminProductsPage () {
    /**query for products*/
    const {loading,data,refetch} = useQuery(GET_ALL_PRODUCTS);
    /**if query is not finished display loading */
if(loading) {
    return (
        <div>loading...</div>
    );
}
/**turn data into a products variable for ease of use */
const products = data.getProducts;
console.log(products); 
return (
    /**if stuff is not loading display all products */
    <AdminProductPageSection>
    {products.map(product => (
        <ProductCard key={product._id} product={product}/>
    ))}
</AdminProductPageSection>
  
);

 };
 /** 
   auth.loggedIn() && auth.getProfile().data.isAdmin ? (<AdminProductPageSection>
        {products.map(product => (
            <ProductCard key={product._id} product={product}/>
        ))}
    </AdminProductPageSection>):(<div>no admin</div>)


       <AdminProductPageSection>
        {products.map(product => (
            <ProductCard key={product._id} product={product}/>
        ))}
    </AdminProductPageSection>

 */