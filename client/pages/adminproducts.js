import { useState, useEffect } from 'react';
 /**import useQuery so we can query for products */
 import { useQuery } from "@apollo/client";
 /**import the products query*/
 import { GET_ALL_PRODUCTS_ADMIN_PP } from "../utils/queries";
 import ProductCard from "../components/ProductCards";
import { AdminProductPageSection } from "../styles/Section.styled";
/**import token functionality to use for conditionals */
import auth from '../utils/auth';

 export default function AdminProductsPage () {
    console.log(auth.getProfile().data.isAdmin);
    /**query for products*/
    const {loading,data,refetch} = useQuery(GET_ALL_PRODUCTS_ADMIN_PP);
    /**if query is not finished display loading */
if(loading) {
    return (
        <div>loading...</div>
    );
}

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