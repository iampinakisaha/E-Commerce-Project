// WallpaperCarousel.jsx

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { images }  from '../../helpers/';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCatagory } from "../../store/allCatagorySlice";
import { loadingActions } from "../../store/loadingSlice";
import { toast } from "react-toastify";
import SummaryApi from "../../common"; 
import useDeviceType from "../../helpers/useDeviceType";
import LoadingSpinner from "../../helpers/loadingSpinner";
import { FaAngleDown } from "react-icons/fa";
// const wallpapers = [
//   images.img1, images.img2, images.img3, images.img4, images.img5
//   // Add more wallpaper URLs
// ];

const WallpaperCarousel = () => {

  const dispatch = useDispatch();
  const allCatagory = useSelector((state) => state.catagoryData.catagory);
  const loadingStatus = useSelector((state) => state.loading);

  const isMobile = useDeviceType();

  const fetchAllCatagories = async () => {
    try {
      dispatch(loadingActions.setLoading(true));

      const dataFetch = await fetch(SummaryApi.all_catagory.url, {
        method: SummaryApi.all_catagory.method
      });

      const dataResponse = await dataFetch.json();
      
      if (dataResponse.success) {
        dispatch(setCatagory(dataResponse?.data || []));
        
      } 
    } catch (error) {
      toast.error("Failed to fetch Category");
    } finally {
      dispatch(loadingActions.setLoading(false));
      
    }
  };
  useEffect(() => {
    fetchAllCatagories();
  }, [dispatch]);

  const wallpapersWeb = allCatagory.filter((catagoryType) => catagoryType.catagoryType.toLowerCase() === "carausal").filter((catagoryName) => catagoryName.catagoryName.toLowerCase() === "web banner");
  
  const bannersWeb = wallpapersWeb.flatMap(catagory => catagory.catagoryImage);

  const wallpapersMobile = allCatagory.filter((catagoryType) => catagoryType.catagoryType.toLowerCase() === "carausal").filter((catagoryName) => catagoryName.catagoryName.toLowerCase() === "mobile banner");
  
  const bannersMobile = wallpapersMobile.flatMap(catagory => catagory.catagoryImage);

  const banners = isMobile ? bannersMobile : bannersWeb;
  
  return (
    <div className="w-[99%] mx-auto h-64">
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="w-full h-full"
      >
        {banners.map((wallpaper, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${wallpaper})` }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default WallpaperCarousel;
