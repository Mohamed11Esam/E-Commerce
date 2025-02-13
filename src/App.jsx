import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import MainLayout from "./Pages/MainLayout/MainLayout";
import Home from "./Pages/Home/Home";
import Products from "./Pages/Products/Products";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Cart from "./Pages/Cart/Cart";
import Brands from "./Pages/Brands/Brands";
import Categories from "./Pages/Categories/Categories";
import TokenContextProvder from "./Context/TokenContext";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import ProductDetals from "./Pages/ProductDetals/ProductDetals";
import { RiWifiOffLine } from "react-icons/ri";
import { FaWifi } from "react-icons/fa";
import { Offline, Online } from "react-detect-offline";
import CartContextProvider from "./Context/CartContext";
import toast, { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import CheckOut from './Pages/CheckOut/CheckOut';
import AllOrders from './Pages/AllOrders/AllOrders';
import Wishlist from './Pages/Wishlist/Wishlist';
import WishlistProvider from "./Context/WishlistContext";
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import VerifyCode from './Pages/VerifyCode/VerifyCode';
import UpdatePassword from './Pages/UpdatePassword/UpdatePassword';
function App() {
  const routs = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <CheckOut />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <AllOrders />
            </ProtectedRoutes>
          ),
        },
        {
          path: "forgetPassword",
          element: (

              <ForgetPassword />
          ),
        },
        {
          path: "verifycode",
          element: (

              <VerifyCode />
          ),
        },
        {
          path: "updatepassword",
          element: (

              <UpdatePassword />
          ),
        },
        {
          path: "brands/:id",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "productDetails/:id",
          element: (
            <ProtectedRoutes>
              <ProductDetals />
            </ProtectedRoutes>
          ),
        },
        {
          path: "category/:id",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
      ],
    },
  ]);
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <TokenContextProvder>
        <WishlistProvider>
        <CartContextProvider>
          <div className="row gap-2 items-center offline fixed bottom-2 right-4 bg-green-100 z-50">
            <Offline>
              🔴 You are Offline <RiWifiOffLine className="inline " />
            </Offline>
          </div>
          <ReactQueryDevtools initialIsOpen={false} />
          <Toaster />
          <RouterProvider router={routs}></RouterProvider>
        </CartContextProvider>
        </WishlistProvider>
      </TokenContextProvder>
      
    </QueryClientProvider>
  );
}

export default App;
