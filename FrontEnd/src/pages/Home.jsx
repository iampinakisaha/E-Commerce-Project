import React from "react";
import WallpaperCarousel from "../components/homeComponents/WallpaperCarousel";
import Navbar from "../components/homeComponents/Navbar";

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
