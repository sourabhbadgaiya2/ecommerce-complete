import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Categories from "./Categories";

const ImageSlider = () => {
  // Images Array
  const images = ["/image2.jpg", "/image1.png", "/image1.png", "/image1.png"];

  // Text Array
  const textData = [
    {
      title: "Enhance Your Music Experience",
      category: "Categories",
      button: "Buy Now!",
      bgColor: "bg-black",
      textColor: "text-white",
      buttonColor: "bg-green-500 hover:bg-green-600",
      rotateImg: "rotate-3",
    },
    {
      title: "Up to 10% off Voucher",
      category: "iPhone 14 Series",
      button: "Shop Now",
      bgColor: "bg-black",
      textColor: "text-white",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
    },
  ];

  // Slider Settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className='flex flex-col md:flex-row gap-4 mx-auto'>
      {/* Image Slider */}
      <div className='w-full md:w-screen h-[400px] mb-8 overflow-hidden p-2 md:p-4 mx-auto'>
        <Slider {...settings}>
          {textData.map((text, index) => (
            <div
              key={index}
              className={`${text.bgColor}  ${text.textColor} mx-auto  flex flex-col md:flex-row items-center justify-between p-8 md:p-12 rounded-lg overflow-hidden`}
            >
              <div className='md:flex overflow-hidden'>
                {/* Left Side - Text Content */}
                <div className='text-center md:text-left md:w-1/2'>
                  <h4 className='text-sm font-bold uppercase'>
                    {text.category}
                  </h4>
                  <h1 className='text-3xl md:text-6xl font-bold mt-2 leading-tight'>
                    {text.title}
                  </h1>

                  {/* Button */}
                  <button
                    className={`${text.buttonColor} text-black font-bold py-3 px-6 rounded-md mt-6 transition-all`}
                  >
                    {text.button}
                  </button>
                </div>

                {/* Right Side - Image (Fixed Alignment) */}
                <div className='md:w-1/2 flex justify-center items-center overflow-hidden'>
                  <img
                    src={images[index % images.length]}
                    alt={`slide-${index}`}
                    className={`w-full h-[150px] md:h-[250px] mt-8  rounded-lg object-contain ${text.rotateImg}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ImageSlider;
