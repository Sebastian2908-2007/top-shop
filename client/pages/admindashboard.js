import React, { useRef, useState } from "react";
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
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";



// import required modules
import { EffectCards } from "swiper";

const admindashboard = () => {
    /**call category query refetch will happen when form is submitted*/
    const {loading,data,refetch} = useQuery(GET_CATEGORIES);
    // todays date\
    const unixDate = Date.now()
    const todaysDate = dateFormat(unixDate);
    return(
        <MainAdminSection>
            <AdminDashTitle>{todaysDate}</AdminDashTitle>
        <Swiper
          effect={"cards"}
          grabCursor={true}
          modules={[EffectCards]}
          className="mySwiper"
        >
          <SwiperSlide><AddCategory data={data} refetch={refetch} loading={loading}/></SwiperSlide>
          <SwiperSlide><AddProduct data={data} loading={loading}/></SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
        </Swiper>
        </MainAdminSection>
    );
};

export default admindashboard;