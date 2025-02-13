import axios from "axios";
import styles from "./Categories.module.css";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import Loader from "../../Components/Loader/Loader";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
function Categories() {
  const { id } = useParams();
  function getCatrgories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`);
  }

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCatrgories,
  });
  return (
    <>
      <Helmet>
        <title>categories</title>
      </Helmet>
      {isLoading ? (
        <Loader />
      ) : (
        <>

        <div className="row justify-center items-center my-4">
          <div className="w-1/2 flex flex-col gap-2 items-center"><img className="w-[250px] border-2 border-green-600" src={data.data.data.image} /><h2 className="text-center text-2xl font-semibold ">{data.data.data.name}</h2></div>
        </div>
        </>
      )}
    </>
  );
}

export default Categories;
