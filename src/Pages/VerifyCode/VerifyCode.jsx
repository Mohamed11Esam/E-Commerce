import { Link, useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useContext, useState } from "react";
import { tokenContext } from "../../Context/TokenContext";
function VerifyCode() {
    const [codeError, setcodeError] = useState(null);
    const [isLoadingt, setIsLoadingt] = useState(false);
    const navigate = useNavigate();
    async function handleRefister(data) {
      setIsLoadingt(true);
      //call api
      let res = await axios
        .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", data)
        .then((response) => {
          navigate("/updatepassword");
          setIsLoadingt(false);
        })
        .catch((error) => {
          setcodeError(error.response.data.message);
          setIsLoadingt(false);
        });
      console.log(codeError);
    }
    const initialValues = {
        resetCode: "",
    };
    const validationSchema = Yup.object({
        resetCode: Yup.string().required(),
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
                Reset Code :
                </h1>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={formik.handleSubmit}
                >
                  <div>
                    <label
                      htmlFor="resetCode"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      resetCode :
                    </label>
                    <input
                      onChange={formik.handleChange}
                      value={formik.values.resetCode}
                      type="text"
                      name="resetCode"
                      id="resetCode"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder=""
                      onBlur={formik.handleBlur}
                    />
                    {formik.errors.resetCode && formik.touched.resetCode && (
                      <small className="text-red-600">{formik.errors.resetCode}</small>
                    )}
                  </div>
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
                        Submit
                      </button>
                    )}
                  </div>

                </form>
              </div>
            </div>
          </div>
        </section>
      );
}

export default VerifyCode
