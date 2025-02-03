import styles from "./NavBar.module.css";
import logo from "../../assets/images/freshcart-logo.svg";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaInstagram ,FaYoutube ,FaLinkedinIn,FaFacebook,FaTiktok,FaTwitter} from "react-icons/fa";
import { useContext } from "react";
import { tokenContext } from "../../Context/TokenContext";
function NavBar() {
  const {token,setToken} = useContext(tokenContext);
  const navigate = useNavigate();
  function logoutUser(){
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  }
  return (
    <div>
      <nav className=" border-gray-200 bg-gray-100 ">
        <div className="container md:w flex flex-wrap items-center justify-between mx-auto p-4 ">
          <div className="flex flex-wrap items-center justify-between w-3/5">
            <Link
              to={""}
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="h-8" alt="freshcart-logo" />
            </Link>
              {token &&
            <div
              className="hidden  md:block md:w-auto w-3/5"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 text-neutral-900 ">
                <li>
                  <NavLink
                    to={""}
                    className="block py-2 px-3 text-neutral-700  md:p-0 text-sm "
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"cart"}
                    className="block py-2 px-3 text-neutral-700  md:p-0 text-sm "
                    aria-current="page"
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"products"}
                    className="block py-2 px-3 text-neutral-700  md:p-0 text-sm "
                    aria-current="page"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"categories"}
                    className="block py-2 px-3 text-neutral-700  md:p-0 text-sm "
                    aria-current="page"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"brands"}
                    className="block py-2 px-3 text-neutral-700  md:p-0 text-sm "
                    aria-current="page"
                  >
                    Brands
                  </NavLink>
                </li>
              </ul>
            </div>
              }       
          </div>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
          <div
            className="hidden  md:block md:w-auto w-2/5"
            id="navbar-default "
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  ">
                <li>
                  <Link
                    to={""}
                    className="block py-2 px-3 text-neutral-700  md:p-0 text-sm "
                    aria-current="page"
                  >
                    <FaInstagram className="hover:text-pink-700" size={18}/>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"cart"}
                    className="block py-2 px-3 text-neutral-700  md:p-0 text-sm "
                    aria-current="page"
                  >
                    <FaFacebook className="hover:text-blue-800" size={18}/>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"products"}
                    className="block py-2 px-3 text-neutral-700  md:p-0 text-sm "
                    aria-current="page"
                  >
                    <FaTiktok  size={18}/>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"categories"}
                    className="block py-2 px-3 text-neutral-700  md:p-0 text-sm "
                    aria-current="page"
                  >
                    <FaTwitter className="hover:text-blue-600" size={18}/>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"categories"}
                    className="block py-2 px-3 text-neutral-700  md:p-0 text-sm "
                    aria-current="page"
                  >
                    <FaLinkedinIn className="hover:text-blue-600"  size={18}/>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"categories"}
                    className="block py-2 px-3 text-neutral-700  md:p-0 text-sm "
                    aria-current="page"
                  >
                    <FaYoutube className="hover:text-red-600"  size={18}/>
                  </Link>
                </li>
                {token &&
                <li>
                  <div
                    onClick={()=>{logoutUser()}}
                    to={"signout"}
                    className="block py-2 cursor-pointer px-3 text-neutral-700  md:p-0 text-sm hover:text-red-700"
                    aria-current="page"
                  >
                    SignOut
                  </div>
                </li>
                }
                {!token &&
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
                } 
              </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
