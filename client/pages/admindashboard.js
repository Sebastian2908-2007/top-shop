import React, { useEffect, useRef, useState } from "react";
import {useQuery} from '@apollo/client';
import { MainAdminSection } from "../styles/Section.styled";
import { AdminDashTitle } from "../styles/H1.styled";
/**import query to get categories */
import { GET_CATEGORIES } from "../utils/queries";
/*format date function*/
import dateFormat from "../utils/dateFormat";
/**bring in add category component for adding category section*/
import AddCategory from "../components/AddCategory";
/**import add product component*/
import AddProduct from "../components/AddProduct";
/**im port add bl;ogpost component*/
import AddBlogpost from "../components/AddBlogpost";
/**import admin reviews component*/
import AdminReviews from "../components/AdminReviews";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
/**Token stuff */
import auth from '../utils/auth';
/**not admin component it displays if non admin user somehow comes here*/
import NotAdmin from "../components/NotAdmin";


// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";



// import required modules
import { EffectCards } from "swiper";
import AdminUsers from "../components/AdminUsers";


const Admindashboard = () => {
    /**call category query refetch will happen when form is submitted*/
    const {loading,data,refetch} = useQuery(GET_CATEGORIES);
    // todays date\
    const unixDate = Date.now()
    const todaysDate = dateFormat(unixDate);
    /**checks to see if the user is an admin*/
    const [isAdmin,setIsAdmin] = useState(true);
    /**set admin data at runtime with useEffect*/
    useEffect(() => {
      if(auth.loggedIn()) { 
        setIsAdmin ( auth.getProfile().data.isAdmin);
        }else{
          setIsAdmin (false);
        };
    },[])
    
    return(
       
        <MainAdminSection>
            <AdminDashTitle>{todaysDate}</AdminDashTitle>
            {isAdmin ? ( 
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          <SwiperSlide><AddCategory data={data} refetch={refetch} loading={loading}/></SwiperSlide>
          <SwiperSlide><AddProduct data={data} loading={loading}/></SwiperSlide>
          <SwiperSlide><AddBlogpost/></SwiperSlide>
          <SwiperSlide><AdminReviews/></SwiperSlide>
          <SwiperSlide><AdminUsers/></SwiperSlide>
        </Swiper>):(<NotAdmin/>)}
        </MainAdminSection>
    );
       
};

export default Admindashboard;