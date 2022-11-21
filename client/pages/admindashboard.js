import React, { useRef, useState } from "react";
import { MainAdminSection } from "../styles/Section.styled";
import { AdminDashTitle } from "../styles/H1.styled";
/*format date function*/
import dateFormat from "../utils/dateFormat";
/**bring in add category component for adding category section*/
import AddCategory from "../components/AddCategory";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";



// import required modules
import { EffectCards } from "swiper";

const admindashboard = () => {
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
          <SwiperSlide><AddCategory/></SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 4</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
        </Swiper>
        </MainAdminSection>
    );
};

export default admindashboard;