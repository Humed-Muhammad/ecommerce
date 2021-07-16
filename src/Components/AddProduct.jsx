import React, { useState, useEffect, useRef } from "react";
import { addProduct } from "../redux/slice/product";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { add_products } from "../api";
import Category from "./Caregories/Catagory.jsx";
import SubCategories from "./Caregories/SubCategories.jsx";
import Quantity from "./Caregories/Quantity.jsx";

const Add = () => {
  let [title, setTitle] = useState("");
  let [price, setPrice] = useState("");
  let [website, setWebsite] = useState("");
  let [color, setColor] = useState("");
  let [size, setSize] = useState("");
  let [quantity, setQuantity] = useState("");
  let [preiview, setPreview] = useState("");
  let [description, setDescription] = useState("");
  let [shortDescription, setShortDescription] = useState("");
  let [category, setCategory] = useState("");
  let [categoryId, setCategoryId] = useState("");

  let [subCategoryType, setSubCategoryType] = useState("");

  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(category);
    console.log(categoryId);

    console.log(subCategoryType);
  }, [category, categoryId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let data = await add_products(products);

    console.log(products, data);
  };

  return (
    <div className="relative w-screen bg-white flex justify-center items-center mt-20">
      <h1 className="text-2xl text-green-400 absolute top-10 border-b border-gray-400">
        Add Product
      </h1>

      <form
        onSubmit={(e) => handleSubmit(e)}
        className="absolute w-full top-20 px-6 py-4 bg-gray-100 shadow-md lg:w-9/12 md:rounded-3xl"
      >
        <div className="flex flex-col justify-around items-center w-full md:flex-row">
          <div className="w-full flex flex-col justify-center items-baseline">
            <label>Title</label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="outline-none rounded border border-gray-400 mb-5 mr-2 bg-white p-2 w-11/12 mr-5 placeholder-gray-400 focus:placeholder-gray-300 border-b border-gray-200 "
              type="text"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-baseline">
            <label>Price</label>
            <input
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="outline-none rounded border border-gray-400 mb-5 mr-2 bg-white p-2 w-11/12 placeholder-gray-400 focus:placeholder-gray-300 border-b border-gray-200 "
              type="text"
            />
          </div>
        </div>
        <div className="w-full flex-col flex justify-between items-center mb-5 md:flex-row md:items-baseline">
          <Category
            setCategoryId={setCategoryId}
            category={category}
            setCategory={setCategory}
          />
          <SubCategories
            categoryId={categoryId}
            setSubCategoryType={setSubCategoryType}
          />
          <Quantity setQuantity={setQuantity} />
        </div>
        <div className="flex flex-col justify-around items-center w-full md:flex-row ">
          <div className="w-full flex flex-col justify-center items-baseline">
            <label>Website</label>
            <input
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Website"
              className="outline-none rounded border border-gray-400 mb-5 mr-2 bg-white p-2 w-11/12 placeholder-gray-400 focus:placeholder-gray-300 border-b border-gray-200 "
              type="text"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-baseline">
            <label className="text-gray-500">Size</label>
            <input
              onChange={(e) => setSize(e.target.value)}
              placeholder="Size"
              className="outline-none rounded border border-gray-400 mb-5 mr-2 bg-white p-2 w-11/12 placeholder-gray-400 focus:placeholder-gray-300 border-b border-gray-200 "
              type="text"
            />
          </div>
          <div className="w-full flex flex-col justify-center items-baseline">
            <label className="text-gray-500">Color</label>
            <input
              onChange={(e) => setColor(e.target.value)}
              placeholder="Color"
              className="outline-none rounded border border-gray-400 mb-5 mr-2 bg-white p-2 w-11/12 placeholder-gray-400 focus:placeholder-gray-300 border-b border-gray-200 "
              type="text"
            />
          </div>
        </div>

        <div className="w-full flex flex-col justify-center items-baseline">
          <textarea
            onChange={(e) => setShortDescription(e.target.value)}
            placeholder="Short description"
            className="outline-none rounded border border-gray-400 mb-5 mr-2 h-24 w-full p-2 placeholder-gray-400 focus:placeholder-gray-300 placeholder-top text-gray-500"
            name="text"
            id=""
            cols="30"
            rows="10"
          ></textarea>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Full description"
            className="outline-none rounded border border-gray-400 mb-5 mr-2 h-48 w-full p-2 placeholder-gray-400 focus:placeholder-gray-300 placeholder-top text-gray-500"
            name="text"
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>

        <div className="flex flex-col justify-center items-center">
          <label className="text-gray-500">Image</label>
          <input
            onChange={(e) => {
              const file = e.target.files[0];
              const reader = new FileReader();

              reader.onloadend = () => {
                setPreview(reader.result);
              };
              reader.readAsDataURL(file);
            }}
            className="w-3/5 bg-white py-2 px-3 rounded-md"
            type="file"
            accept="image/*"
          />
        </div>
        <div className="flex justify-center items-center mt-5 ">
          <button
            onClick={() =>
              dispatch(
                addProduct({
                  price,
                  title,
                  size,
                  color,
                  website,
                  image: preiview,
                  description,
                  shortDescription,
                  categoryType: category,
                  subCategoryType,
                  quantity,
                })
              )
            }
            type="submit"
            className="p-1 bg-green-400 text-white  h-12 w-2/5 mr-5 rounded-md"
          >
            Add
          </button>
          <Link
            to="/"
            className="p-1 bg-gray-700 text-white flex justify-center items-center h-12 w-2/5 rounded-md"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Add;
