import React, { useState, useEffect } from "react";
import { postApi } from "../api";
import { getCategoryProduct } from "../redux/slice/product";
import { useSelector, useDispatch } from "react-redux";
import Card from "./Card.jsx";

const Products = ({ path }) => {
  const { categoryProduct } = useSelector((state) => state.products);
  let { cartItems } = useSelector((state) => state.cartBucket);

  const dispatch = useDispatch();

  let [response, setResponse] = useState({ status: "", message: "" });

  useEffect(() => {
    let fetchData = async () => {
      let { status, message } = await postApi("category", path);

      setResponse({ status, message });
      if (status) {
        dispatch(getCategoryProduct(await message));
      }
    };
    fetchData();
  }, [cartItems]);

  return (
    <div className="bg-white mt-20  w-full flex flex-wrap justify-center items-center">
      {categoryProduct.map((item) => (
        <Card item={item} />
      ))}
    </div>
  );
};

export default Products;
