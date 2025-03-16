import React from "react";
import ImageSlider from "../components/ImageSlider";
import Search from "../components/Search";
import Cards from "../components/Cards";

const Home = () => {
  return (
    <div className='p-2'>
      <Search />
      {/* <ImageSlider /> */}
      <Cards />
    </div>
  );
};

export default Home;
