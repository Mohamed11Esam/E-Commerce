import { useEffect, useState } from "react";
import styles from "./LatestProducts.module.css";
import axios from "axios";
import { TiStarFullOutline } from "react-icons/ti";
import ProductItem from "../ProductItem/ProductItem";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { useContext } from "react";
import { CartContext } from "../../Context/CartContext";
import { WishlistContext } from "../../Context/WishlistContext";


function LatestProducts() {
    const [products, setProducts] = useState([])
  async function getProducts() {
    await axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => { });
  }

  useEffect(() => {
    getProducts()
  }, []);

  const {addToCart,setCartId,setNumOfCartItem} = useContext(CartContext);
  const {addToWishlist,setWishListData,removeWishlistItem,isInWishlist,getLoggedWishlistData} = useContext(WishlistContext)
  async function addProduct(productId){
    let res = await addToCart(productId);
   
    if (res.status === 200) {
      setCartId(res.data.cartId);
      setNumOfCartItem(res.data.numOfCartItems)
      toast.success(res.data.message,{
        position: 'bottom-right',});
    }
    else{
      toast.error('Something Wrong',{
        position: 'bottom-right',});
    }
  }
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
  
  return <div className="row my-10 justify-center">
    {products.length > 0 ? products.map((product)=> (
        <div className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6" key={product.id}>
            <ProductItem product={product} addProduct={addProduct} isInWishlist={isInWishlist} deleteProductToWishlist={deleteProductToWishlist} addProductToWishlist={addProductToWishlist}/>
        </div>
    )):<Loader/>
    }
    </div>;
}

export default LatestProducts;
