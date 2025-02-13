import axios from "axios";
import { useEffect, useState } from "react";
import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1300,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};
export default function BrandSlider() {
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/brands")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {});
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="my-8">
      <h2 className="my-3 text-xl">Shop Popular Brands</h2>
      <Slider className="m-3" {...settings}>
        {categories.map((Brand) => (
          <div key={Brand._id} className="border-2 border-transparent hover:border-b-main">
            <Link to={`/brands/${Brand._id}`}>
              <img
                src={Brand.image}
                className="w-full h-[150px]"
                alt={Brand.name}
              />
              <h4 className="font-semibold m-3">{Brand.name}</h4>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
}
