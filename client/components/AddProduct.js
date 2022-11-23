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
import s3Upload from '../utils/s3';

const AddProduct = ({data,loading}) => {
/**menu item styles */
const menuItemStyle = {
    border:'1px solid rgba(223,223,16,1)',
    background:'linear-gradient(to right, rgb(199, 197, 104),rgb(0,0,0));',
    color:'rgba(223,223,16,1)'
};

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
useEffect(()=>{console.log(productImage),console.log(category),console.log(formData)},[formData,category,productImage]);
    /**change function to grab product image for the product upload*/
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

        <AdminForm marginTop='11%' height='50%'>
            <AdminFormInput onChange={handleFormData} name="name" placeholder="enter product name"/>
            <AdminFormInput onChange={handleFormData} name="description" placeholder="enter product description"/>
            <AdminFormInput onChange={handleFormData} name="price" placeholder="enter product price"/>
            <AdminFormInput onChange={handleFormData} name="quantity" placeholder="enter product quantity"/>
            <AdminFormInput name='image' type='file' accept='/image' onChange={fileChange}/>
            <AdminFormButton>Add product</AdminFormButton>
        </AdminForm>
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