import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { tokenContext } from "../../Context/TokenContext";
function Login() {
  const [accExist, setAccExist] = useState(null);
  const [isLoadingt, setIsLoadingt] = useState(false);
  const navigate = useNavigate();
  const {setToken} = useContext(tokenContext);
  async function handleRefister(data) {
    setIsLoadingt(true);
    //call api
    let res = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", data)
      .then((response) => {
        setToken(response.data.token);
        localStorage.setItem('token',response.data.token);
        navigate("/");
        setAccExist(null);
        setIsLoadingt(false);
      })
      .catch((error) => {
        setAccExist(error.response.data.message);
        setIsLoadingt(false);
      });
  }
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string()
      .required()
      .matches(/^[A-Za-z1-9]{8,12}$/, "Password is not valid"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleRefister,
  });


  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-4xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login Now :
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={formik.handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  email :
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onBlur={formik.handleBlur}
                />
                {formik.errors.email && formik.touched.email && (
                  <small className="text-red-600">{formik.errors.email}</small>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password :
                </label>
                <input
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onBlur={formik.handleBlur}
                />
                {formik.errors.password && formik.touched.password && (
                  <small className="text-red-600">
                    {formik.errors.password}
                  </small>
                )}
              </div>

              {accExist && (
                <div className="bg-red-300 p-3 rounded-md my-2">{accExist}</div>
              )}
              <div className="flex justify-end">
                {isLoadingt ? (
                  <button
                    disabled
                    className=" focus:outline-none text-white bg-main  hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Loading .....
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="focus:outline-none text-white bg-main  hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    Login
                  </button>
                )}
              </div>
<div className="flex flex-wrap justify-between">
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Creat New Account ?{" "}
                <Link
                  to={"/register"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Register
                </Link>
              </p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                <Link
                  to={"/forgetPassword"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Forget Password ?
                </Link>
              </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
