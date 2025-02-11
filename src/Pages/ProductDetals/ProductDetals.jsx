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
import { WishlistContext } from './../../Context/WishlistContext';
import { FaHeart } from "react-icons/fa6";
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
  const {addToCart,setCartId,setNumOfCartItem} = useContext(CartContext);
  async function addProduct(productId){
    let res = await addToCart(productId);
    
    if (res.status === 200) {
      setCartId(res.data.cartId);
    setNumOfCartItem(res.data.numOfCartItems);
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
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getProductDetails();
  }, []);
  const {addToWishlist,setWishListData,removeWishlistItem,isInWishlist,wishListData,getLoggedWishlistData} = useContext(WishlistContext);
  async function addProductToWishlist(productId){
    let res = await addToWishlist(productId);
    setWishListData(res.data.data);

  }
  async function deleteProductToWishlist(productId){
    let res = await removeWishlistItem(productId);
    setWishListData(res.data.data);
  }
  async function getWishlistdata(){
    let res = await getLoggedWishlistData();
    let ids = res.data.map((item)=>item.id)
    setWishListData(ids);

  }
  useEffect(() => {
    getWishlistdata();
  }, [])
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
          <div className="flex flex-wrap">
          <div className="w-4/5"> 

          <button className="btn w-full" onClick={()=>{addProduct(details.id); deleteProductToWishlist(details.id);}}>Add To Cart</button>
          </div>
          <button className={`hover:text-red-600 flex justify-center items-center w-1/5 ${isInWishlist(details.id) ? 'text-red-700':'text-black'}`} onClick={()=>{isInWishlist(details.id) ? deleteProductToWishlist(details.id) :addProductToWishlist(details.id)}}><FaHeart size={30} /></button>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default ProductDetals;
