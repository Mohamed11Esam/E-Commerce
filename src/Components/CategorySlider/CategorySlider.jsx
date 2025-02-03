import axios from "axios";
import styles from "./CategorySlider.module.css";
import { useEffect, useState } from "react";
import React from "react";
import Slider from "react-slick";
const settings = {
  dots: true,
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
        dots: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};
export default function CategorySlider() {
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {});
  }
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
    <h2 className="my-3 text-xl">Shop popular categories</h2>
    <Slider className="m-3" {...settings}>
      {categories.map((category) => (
        <div key={category._id}>
          {console.log(category)}
          <img src={category.image} className="w-full h-[400px]" alt={category.name} />
          <h4 className="font-semibold m-3">{category.name}</h4>
        </div>
      ))}
    </Slider>
    </div>
  );
}
