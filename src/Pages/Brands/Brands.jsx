import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../Components/Loader/Loader";
import { useParams } from 'react-router-dom';
import { CartContext } from './../../Context/CartContext';
import { WishlistContext } from './../../Context/WishlistContext';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import ProductItem from './../../Components/ProductItem/ProductItem';
import noProducts from '../../assets/images/Empty-cart.97fb3c19229a1ba90557c158abbeecab.svg'
import { Helmet } from "react-helmet";
function Brands() {
  const [loading, setLoading] = useState(true);
    const { id } = useParams();
      const [products, setProducts] = useState([]);
    function getBrand() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
      }
      const { data, isLoading } = useQuery({
        queryKey: ["brand"],
        queryFn: getBrand,
      });
      async function getProducts() {
        setLoading(true);
        await axios
          .get(`https://ecommerce.routemisr.com/api/v1/products?brand=${id}`)
          .then((res) => {
            setProducts(res.data.data);
            setResults(res.data);
          })
          .catch((err) => { });
          setLoading(false);
      }
      useEffect(() => {
       getProducts();
      }, [])
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
    return (
        <>
        <Helmet>
                <title>brands</title>
            </Helmet>
        {isLoading ? (
          <Loader />
        ) : (
          <>
  
          <div className="row justify-center items-center my-4">
            <div className="w-1/2 flex flex-col gap-2 items-center"><img className="w-[250px] border-2 border-green-600" src={data.data.data.image} /><h2 className="text-center text-2xl font-semibold ">{data.data.data.name}</h2></div>
          </div>
          <section> 
          {loading?<Loader/>:
            <div className="row my-10 justify-center">
    {products.length > 0 ? products.map((product)=> (
        <div className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6" key={product.id}>
            <ProductItem product={product} addProduct={addProduct} isInWishlist={isInWishlist} deleteProductToWishlist={deleteProductToWishlist} addProductToWishlist={addProductToWishlist}/>
        </div>
    )):<img src={noProducts} className="" alt="" />
    }
      </div>}
    </section>
          </>
        )}
      </>
    )
}

export default Brands
