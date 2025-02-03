import styles from "./MainSlider.module.css";
import img1 from "../../assets/images/slider-image-1.jpeg";
import img2 from "../../assets/images/slider-image-2.jpeg";
import img3 from "../../assets/images/slider-image-3.jpeg";
import React from "react";
import Slider from "react-slick";
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows:false,
  autoplay:true,
};
function MainSlider() {
  return (
    <div className="row my-10">
      <div className="w-3/4">
        <Slider {...settings}>
          <div>
          <img src={img1} className="w-full h-[500px]" />
          </div>
          <div>
          <img src={img3} className="w-full h-[500px]" />
          </div>
          <div>
          <img src={img2} className="w-full h-[500px]" />
          </div>
        </Slider>
        
      </div>
      <div className="w-1/4">

      <Slider {...settings} >

          <img src={img2} className="w-full h-[250px]" />


          <img src={img1} className="w-full h-[250px]" />


          <img src={img3} className="w-full h-[250px]" />

        </Slider>
     

        <Slider {...settings} >

          <img src={img3} className="w-full h-[250px]" />


          <img src={img2} className="w-full h-[250px]" />


          <img src={img1} className="w-full h-[250px]" />

        </Slider>

        
      </div>
    </div>
  );
}

export default MainSlider;
