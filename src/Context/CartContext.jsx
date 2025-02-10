import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const [numOfCartItem, setNumOfCartItem] = useState(0);
  const [cartId, setCartId] = useState(null);

  const headers = {
    token: localStorage.getItem("token"),
  };

  function addToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        {
          productId,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function removeCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }
  function updateProductCount(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count: count,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }
  function getLoggedCartData() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => err);
  }
  function deleteItems() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((res) => res.data)
      .catch((err) => err);
  }
  function cashOnDelivery(data){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,data,{
      headers
    }).then((res) => res)
    .catch((err) => err);
  }
  function onlinePayment(data){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`,data,{
      headers
    }).then((res) => res)
    .catch((err) => err);
  }
  async function getUserdata() {
    let res = await getLoggedCartData();   
    setCartId(res.cartId);
    setNumOfCartItem(res.numOfCartItems)
  }
  useEffect(() => {
    getUserdata();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getLoggedCartData,
        removeCartItem,
        updateProductCount,
        numOfCartItem,
        setCartId,
        setNumOfCartItem,
        deleteItems,
        cashOnDelivery,
        onlinePayment
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
