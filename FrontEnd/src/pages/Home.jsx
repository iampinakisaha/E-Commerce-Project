import React from "react";
import WallpaperCarousel from "../components/home/WallpaperCarousel";
import Navbar from "../components/home/Navbar";

const Home = () => {
  return <div>
    {/* home Item header - start */}
      <Navbar/>
    {/* home Item header - end */}

    {/* carausal - start */}
      <WallpaperCarousel/>
    {/* carausal - end */}
    </div>;
};

export default Home;
