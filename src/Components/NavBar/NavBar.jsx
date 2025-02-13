import styles from "./NavBar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaFacebook,
  FaTiktok,
  FaTwitter,
    
} from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { useContext } from "react";
import { tokenContext } from "../../Context/TokenContext";
import { CartContext } from './../../Context/CartContext';
import { FaRegHeart } from "react-icons/fa6";
function NavBar() {
  const { token, setToken } = useContext(tokenContext);
  const { numOfCartItem } = useContext(CartContext);
  const navigate = useNavigate();
  function logoutUser() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }
  return (
    <div>
      <nav className=" border-gray-200 bg-gray-100 ">
        <div className="container md:w-full flex flex-wrap items-center justify-center mx-auto p-4  ">
          <div className="flex flex-wrap items-center  md:justify-center  w-full">
            <Link to={""} className="w-1/5">
              <img src={logo} className="h-8" alt="freshcart-logo" />
            </Link>

            <div
              className="hidden  md:flex  justify-between w-full md:w-4/5  "
              id="navbar-default"
            >
              {token && (
                <ul className="font-medium flex flex-col md:p-4  mt-4  w-1/2   md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0  text-neutral-900 ">
                  <li>
                    <NavLink
                      to={""}
                      className="block py-2 px-3 text-neutral-700  md:p-0 text-sm hover:text-main"
                      aria-current="page"
                    >
                      Home
                    </NavLink>
                  </li>
                  
                  <li>
                    <NavLink
                      to={"products"}
                      className="block py-2 px-3 text-neutral-700  md:p-0 text-sm hover:text-main"
                      aria-current="page"
                    >
                      Products
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to={"allorders"}
                      className="block py-2 px-3 text-neutral-700  md:p-0 text-sm hover:text-main"
                      aria-current="page"
                    >
                      Orders
                    </NavLink>
                  </li>
                </ul>
              )}
              <ul className="font-medium  flex flex-col md-p-4 md:p-0 md:items-center  md:justify-end w-1/2  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0  ">
              {token && (<>
              <li>
                    <NavLink
                      to={"wishlist"}
                      className="wishlist block py-2 px-3  text-neutral-700  md:p-0 text-sm hover:text-red-600"
                      aria-current="page"
                    >
                     <FaRegHeart     size={24} />
                    </NavLink>
                  </li>
              <li>
                    <NavLink
                      to={"cart"}
                      className="block py-2 px-3 relative text-neutral-700  md:p-0 text-sm hover:text-main"
                      aria-current="page"
                    >
                     <IoCartOutline    size={24} />
                     <span className="absolute w-4 h-4 rounded-full text-black flex justify-center items-center bg-main font-semibold -right-2 -top-2">{numOfCartItem}</span>
                    </NavLink>
                  </li>
                  </>
              )}
                <li>
                  <button
                    id="dropdownNavbarLink"
                    data-dropdown-toggle="dropdownNavbar"
                    className="flex items-center justify-between w-full py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-main md:p-0 md:w-auto dark:text-white dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  >
                    Social{" "}
                    <svg
                      className="w-2.5 h-2.5 ms-2.5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  {/* Dropdown menu */}
                  <div
                    id="dropdownNavbar"
                    className="z-10 hidden p-2 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-fit gap-2"
                  >
                    <ul
                      className=" text-sm flex justify-between"
                      aria-labelledby="dropdownLargeButton"
                    >
                      <li>
                        <Link
                          to={""}
                          className="block py-2 px-3 text-neutral-700  md:p-0 text-sm mx-2 "
                          aria-current="page"
                        >
                          <FaInstagram
                            className="hover:text-pink-700"
                            size={18}
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="block py-2 px-3 text-neutral-700  md:p-0 text-sm mx-2 "
                          aria-current="page"
                        >
                          <FaFacebook
                            className="hover:text-blue-800"
                            size={18}
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="block py-2 px-3 text-neutral-700  md:p-0 text-sm mx-2 "
                          aria-current="page"
                        >
                          <FaTiktok size={18} />
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="block py-2 px-3 text-neutral-700  md:p-0 text-sm mx-2 "
                          aria-current="page"
                        >
                          <FaTwitter
                            className="hover:text-blue-600"
                            size={18}
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="block py-2 px-3 text-neutral-700  md:p-0 text-sm mx-2 "
                          aria-current="page"
                        >
                          <FaLinkedinIn
                            className="hover:text-blue-600"
                            size={18}
                          />
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="block py-2 px-3 text-neutral-700  md:p-0 text-sm mx-2 "
                          aria-current="page"
                        >
                          <FaYoutube className="hover:text-red-600" size={18} />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </li>

                {token && (
                  <li>
                    <div
                      onClick={() => {
                        logoutUser();
                      }}
                      to={"signout"}
                      className="block py-2 cursor-pointer px-3 text-neutral-700  md:p-0 text-sm hover:text-red-700"
                      aria-current="page"
                    >
                      SignOut
                    </div>
                  </li>
                )}
                {!token && (
                  <>
                    <li>
                      <Link
                        to={"login"}
                        className="block py-2 px-3 text-neutral-700  md:p-0 text-sm hover:text-red-700"
                        aria-current="page"
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={"register"}
                        className="block py-2 px-3 text-neutral-700  md:p-0 text-sm hover:text-red-700"
                        aria-current="page"
                      >
                        Register
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <button
              data-collapse-toggle="navbar-default"
              type="button"
              className="inline-flex items-center ml-auto p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-default"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
