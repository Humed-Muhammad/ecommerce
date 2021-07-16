import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCartItems } from "../redux/slice/Cart";
import { getCart } from "../api";
import "@syncfusion/ej2-layouts/styles/material.css";

const Cart = () => {
  let { allCartItems } = useSelector((state) => state.cartBucket);
  let dispatch = useDispatch();

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    let fetchData = async () => {
      let { status, message } = await getCart(userId);
      dispatch(getAllCartItems(message));
      console.log(message);
    };
    fetchData();
  }, []);

  console.log(allCartItems);

  let i = 0;

  allCartItems.map((item) => {
    i += Number(item.price);
  });
  console.log(i);
  return (
    <div className="mt-24 w-screen bg-white flex flex-col justify-center items-center pt-20 md:pt-0">
      <div className="w-full flex flex-wrap justify-center items-center">
        {allCartItems.map((item, id) => (
          <div
            className="e-card e-card-horizontal ml-2 mr-2 mb-2"
            style={{ width: `400px` }}
          >
            <img
              src={item.image}
              alt="Sample"
              className="h-36 object-cover bg-position-top"
            />
            <div className="e-card-stacked">
              <div className="e-card-header">
                <div className="e-card-header-caption">
                  <div className="e-card-header-title">{item.title}</div>
                  <div className="e-card-header-title">Color: {item.color}</div>
                </div>
              </div>
              <div className="e-card-content">
                Type: {item.sub_category_type}
              </div>
              <div className="e-card-content">Price: ${item.price}</div>
            </div>
          </div>
        ))}
      </div>
      <div
        className="e-card e-card-horizontal ml-2 mr-2 mb-2 mt-20 bg-gray-300"
        style={{ width: `400px` }}
      >
        <div className="e-card-stacked">
          <div className="e-card-header">
            <div className="e-card-header-caption">
              <div className="e-card-header-title font-bold">Total: ${i}</div>
            </div>
          </div>
          <div className="e-card-content"></div>
          <button
            style={{ color: "white" }}
            className="e-card-content bg-green-500"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
