// WallpaperCarousel.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { images }  from '../../helpers/';

const wallpapers = [
  images.img1, images.img2, images.img3, images.img4, images.img5
  // Add more wallpaper URLs
];

const WallpaperCarousel = () => {
  return (
    <div className="w-[99%] mx-auto h-64">
      <Swiper
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="w-full h-full"
      >
        {wallpapers.map((wallpaper, index) => (
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
