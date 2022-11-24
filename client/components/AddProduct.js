import { useState, useEffect } from "react";
/**my styled components */
import { AdminForm, AdminFormButton, AdminFormInput } from "../styles/Forms.styled";
import { AdminSectionTitle } from "../styles/H2.styled";
import { CarouselAdminSection } from "../styles/Section.styled";
/**my styled components end*/
/**mui select imports */
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CssBaseline,ThemeProvider  } from '@mui/material';
import { SelectDropdownTheme } from "../utils/themes";
/**mui select imports end*/
/**import S3 function for uploading images */
import {s3Upload} from '../utils/s3';
/**import required mutations to add a product*/
import { ADD_FILE, ADD_PRODUCT } from "../utils/mutations";
/**import query to get product count for LINK */
import { GET_PRODUCTS_FOR_ADMIN_LINK } from "../utils/queries";
/**apollo client useMutation useQuery hook import*/
import { useMutation, useQuery } from "@apollo/client";
import { AdminProductLink } from "../styles/Links.styled";

const AddProduct = ({data,loading}) => {
/**this query gets all products but only returns their ids since it exists really only to get a product count*/
const {data: productData,refetch} = useQuery(GET_PRODUCTS_FOR_ADMIN_LINK);

//console.log(productData);

/**menu item styles */
const menuItemStyle = {
    border:'1px solid rgba(223,223,16,1)',
    background:'linear-gradient(to right, rgb(199, 197, 104),rgb(0,0,0));',
    color:'rgba(223,223,16,1)'
};

/**name mutation for uploading a file and grab error from use mutation*/
const [addProductImage,{fileError}] = useMutation(ADD_FILE);
/**name mutation for adding a product and grab error from use mutation*/
const [addProduct,{productError}] = useMutation(ADD_PRODUCT);

    /**mui select related */
    const [category, setCategory] = useState('');

    /**this function gets the category _id for the product upload */
    const handleSelectChange = (event) => {
      setCategory(event.target.value);
    };
    /**mui select related ends*/

    /**state for the product image*/
    const [productImage,setProductImage] = useState(null);
    /**state for product form fields*/
    const [formData,setFormData] = useState({name:'',description:'',price:'',quantity:''});
//useEffect(()=>{console.log(productImage),console.log(category),console.log(formData)},[formData,category,productImage]);
    /**change function to grab product image for the product upload*/

    /**state for error message*/
    const [formError,setFormError] = useState(null);

    const fileChange = (event) => {
        setProductImage(event.target.files[0]);
    };

    const handleFormData = (event) => {
        const {name,value} = event.target;
        setFormData({
            ...formData,
            [name]:value 
        });
    };

    const handleProductSubmit = async (event) => {
        event.preventDefault();
        try{
            /**upload image to s3 and store return data to a varible so it can be used for upload to my db*/
        const s3ReturnData = await s3Upload(productImage);
        console.log('data before fileupload mutation',s3ReturnData);
        /**use s3 return data to give my file upload data what it needs in my db */
        const imageData = await addProductImage({
            variables:{
              ETag: s3ReturnData.ETag,
              Location:s3ReturnData.Location,
              key:s3ReturnData.key,
              Key:s3ReturnData.Key,
              Bucket:s3ReturnData.Bucket
            }
        });
        console.log('data after file upload to my db',imageData);

        /**get returned _id from mutation to feed to the add product mutation */
        const productImgId = imageData.data.addFile._id;

        /**now its time to use our category _id from the state variable and the _id above to 
         * in conjunction with the form data
         * to upload a product to our data base 
         */
     const productUpload = await addProduct({
        variables:{
            name: formData.name,
            description: formData.description,
            price: parseInt(formData.price),
            quantity: parseInt(formData.quantity),
            image: productImgId,
            category: category
        }
     });
     /**this will reset the product form*/
     document.getElementById('add-product-form').reset();
     /**refetch the products to update the number in the link */
     refetch();
     /**this resets our select menu*/
     setCategory('');
     console.log('sucessful product upload',productUpload);
        
        }catch(e){
            console.log(e);
            setFormError(e.message);
        }
    };

    return(
       <CarouselAdminSection>
        <AdminSectionTitle>Add Product</AdminSectionTitle>

        {/*****************Mui select***************** */}
        <ThemeProvider theme={SelectDropdownTheme}>
            <CssBaseline />
        <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth >
      <InputLabel id="demo-simple-select-label" sx={{color:'rgba(223,223,16,1)',border:'none'}}>Category</InputLabel>
        <Select  sx={{border:'3px solid rgba(223,223,16,1)',color:'rgba(223,223,16,1)'}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={category}
          label="category"
          onChange={handleSelectChange}
        >
            {/**if not loading map through passed category data so we can creat menu items */}
        {loading ? (<div>loading...</div>):( 
           data.getCategories.map(category => (
          <MenuItem sx={menuItemStyle} key={category._id} value={category._id}>{category.name}</MenuItem>
            ))    )
        }
        </Select>
      </FormControl>
      </Box>
      </ThemeProvider>
        {/****************!!!!!!!!Mui select ends!!!!!!!********************/}

        <AdminForm id="add-product-form" onSubmit={handleProductSubmit} marginTop='11%' height='50%'>
          {productError && <div>{formError}</div>}
            <AdminFormInput onChange={handleFormData} name="name" placeholder="enter product name"/>
            <AdminFormInput onChange={handleFormData} name="description" placeholder="enter product description"/>
            <AdminFormInput onChange={handleFormData} name="price" placeholder="enter product price"/>
            <AdminFormInput onChange={handleFormData} name="quantity" placeholder="enter product quantity"/>
            <AdminFormInput name='image' type='file' accept='/image' onChange={fileChange}/>{fileError && <div>{formError}</div>}
            <AdminFormButton type="submit">Add product</AdminFormButton>
        </AdminForm>
        <AdminProductLink href='/adminproducts'>There are {loading ? 'loading':productData.getProducts.length} Products ➯</AdminProductLink>
       </CarouselAdminSection>
    );
};

export default AddProduct;

/**Before doing the below we should pick a category out of a dropdown menu when picking that category we should somehow get the id from it for the product
 * upload mutation we could store this id in a state variable
 */

/**when submitting the product form the first thing in the function should be the s3 file upload function
 * once that is successful we should run the add file mutation once that is successful we should grab the returned id
 * then we can take that and run the add product mutation
 *   
            
 */