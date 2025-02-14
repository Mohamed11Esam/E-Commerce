import axios from "axios";
import { createContext, useEffect, useState, useContext } from "react";
import { tokenContext } from "./TokenContext";

export const CartContext = createContext();

export default function CartContextProvider({ children }) {
  const { token } = useContext(tokenContext);
  const [numOfCartItem, setNumOfCartItem] = useState(0);
  const [cartId, setCartId] = useState(null);

  const headers = {
    token: localStorage.getItem("token"),
  };

  // ✅ Fetch the logged-in user's cart data
  async function getLoggedCartData() {
    try {
      const res = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", { headers });
      return res.data;
    } catch (error) {
      console.error("Error fetching cart data:", error);
      return null;
    }
  }

  // ✅ Fetch cart data and update state
  async function getUserdata() {
    const res = await getLoggedCartData();
    if (res) {
      setCartId(res.cartId);
      setNumOfCartItem(res.numOfCartItems);
    }
  }

  // ✅ Add product to cart and update count
  async function addToCart(productId) {
    try {
      const res = await axios.post("https://ecommerce.routemisr.com/api/v1/cart", { productId }, { headers });
      await getUserdata(); // Refresh cart data
      return res;
    } catch (err) {
      return err;
    }
  }

  // ✅ Remove product and update cart count
  async function removeCartItem(productId) {
    try {
      const res = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, { headers });
      await getUserdata(); // Refresh cart data
      return res;
    } catch (err) {
      return err;
    }
  }

  // ✅ Update product quantity in cart and refresh count
  async function updateProductCount(productId, count) {
    try {
      const res = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count },
        { headers }
      );
      await getUserdata(); // Refresh cart data
      return res;
    } catch (err) {
      return err;
    }
  }

  // ✅ Fetch user's orders
  function getLoggedUserOrders(userId) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
      .then((res) => res.data)
      .catch((err) => err);
  }

  // ✅ Delete all cart items
  async function deleteItems() {
    try {
      const res = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart", { headers });
      await getUserdata(); // Refresh cart data
      return res.data;
    } catch (err) {
      return err;
    }
  }

  // ✅ Cash on delivery order
  function cashOnDelivery(data) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, data, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  // ✅ Online payment order
  function onlinePayment(data) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`, data, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  // ✅ Fetch cart data when token changes (e.g., login/logout)
  useEffect(() => {
    if (token) {
      getUserdata();
    }
  }, [token]); // Re-run when user logs in

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeCartItem,
        updateProductCount,
        getLoggedCartData,
        getLoggedUserOrders,
        deleteItems,
        cashOnDelivery,
        onlinePayment,
        numOfCartItem,
        setNumOfCartItem,
        setCartId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
