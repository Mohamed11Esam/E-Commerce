import axios from "axios";
import styles from "./ProductDetals.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import React from "react";
import Slider from "react-slick";
import { Helmet } from "react-helmet";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay:true,
}
function ProductDetals() {
  const [details, setDetails] = useState({});
  const { id } = useParams();
  const {addToCart} = useContext(CartContext);
  async function addProduct(productId){
    let res = await addToCart(productId);
    console.log(res)
    if (res.status === 200) {
      toast.success(res.data.message,{
        position: 'bottom-right',});
    }
    else{
      toast.error('Something Wrong',{
        position: 'bottom-right',});
    }
  }
  async function getProductDetails() {
    await axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setDetails(res.data.data); 
        console.log(res.data.data)
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getProductDetails();
  }, []);

  
  return (
    <div className="row my-14 items-center overflow-hidden">
        <Helmet>
                <title>{details.title}</title>
            </Helmet>
      <div className="w-full md:w-1/3 lg:w-1/4 p-8">
      <Slider className="w-full" {...settings}>
      {
            details.images?.map((img,i)=>(
            <img className="w-full" key={i} src={img} alt="" />
        ))
      }
    </Slider>
      </div>
      <div className="w-full md:w-2/4 lg:w-3/4">
        <div className="inner p-4">
          <h2 className="font-semibold text-xl">{details.title}</h2>
          <p className="text-gray-700 my-4">{details.description}</p>
          <small>{details.category?.name}</small>
          <div className="flex justify-between my-2">
            <p>{details.price}EGP</p>
            <div className="flex gap-1 items-center">
              <TiStarFullOutline size={21} className="text-yellow-300" />
              {details.ratingsAverage}
            </div>
          </div>
          <button className="btn w-full" onClick={()=>{addProduct(details.id)}}>Add To Cart</button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetals;
