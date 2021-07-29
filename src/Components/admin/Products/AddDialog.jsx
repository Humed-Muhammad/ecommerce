import React, { useState, useEffect } from "react";
import { DialogComponent } from "@syncfusion/ej2-react-popups";
import { v4 as uuidv4 } from "uuid";

import { addProduct } from "../../../redux/slice/product";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "../CategoryBoard/Dropdown.tsx";
import Subdropdown from "../CategoryBoard/Subdropdown.tsx";
import { postApi } from "../../../api/admin";

const AddDialog = ({ setOpen, open }) => {
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

  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { status } = await postApi("add-product", products[0]);
    if (status) {
      window.location.reload();
    }
  };

  let [subCategoryType, setSubCategoryType] = useState("");

  return (
    <div
      className="absolute h-3/5 w-4/5 flex justify-center items-center"
      id="dialog-target"
    >
      <DialogComponent
        width="30%"
        height="700px"
        target="#dialog-target"
        visible={open}
        close={setOpen(false)}
        header="Dialog"
        allowDragging={true}
        showCloseIcon={true}
        position={{ X: "center", Y: "center" }}
      >
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-full flex flex-col justify-around items-center"
        >
          <div className="w-full flex justify-between items-center mb-5">
            <Dropdown setCategory={setCategory} />
            <Subdropdown setSubCategoryType={setSubCategoryType} />
          </div>
          <div className="flex flex-col justify-around items-center w-full md:flex-row">
            <div className="w-full flex flex-col justify-center items-center">
              <input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="outline-none border-b border-indigo-600 mb-5 mr-2 bg-white p-2 w-11/12 mr-5 placeholder-gray-400 focus:placeholder-gray-300 border-b border-gray-200 "
                type="text"
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <input
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="outline-none border-b border-indigo-600 mb-5 mr-2 bg-white p-2 w-11/12 placeholder-gray-400 focus:placeholder-gray-300 border-b border-gray-200 "
                type="text"
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <input
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="quantity"
                className="outline-none border-b border-indigo-600 mb-5 mr-2 bg-white p-2 w-11/12 placeholder-gray-400 focus:placeholder-gray-300 border-b border-gray-200 "
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col justify-around items-center w-full md:flex-row ">
            <div className="w-full flex flex-col justify-center items-center">
              <input
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Website"
                className="outline-none border-b border-indigo-600 mb-5 mr-2 bg-white p-2 w-11/12 placeholder-gray-400 focus:placeholder-gray-300 border-b border-gray-200 "
                type="text"
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <input
                onChange={(e) => setSize(e.target.value)}
                placeholder="Size"
                className="outline-none border-b border-indigo-600 mb-5 mr-2 bg-white p-2 w-11/12 placeholder-gray-400 focus:placeholder-gray-300 border-b border-gray-200 "
                type="text"
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <input
                onChange={(e) => setColor(e.target.value)}
                placeholder="Color"
                className="outline-none border-b border-indigo-600 mb-5 mr-2 bg-white p-2 w-11/12 placeholder-gray-400 focus:placeholder-gray-300 border-b border-gray-200 "
                type="text"
              />
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <textarea
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Short description"
              className="outline-none border-b border-indigo-600 mb-5 mr-2 h-24 w-full p-2 placeholder-gray-400 focus:placeholder-gray-300 placeholder-top text-gray-500"
              name="text"
              id=""
              cols="30"
              rows="10"
            ></textarea>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Full description"
              className="outline-none border-b border-indigo-600 mb-5 mr-2 h-48 w-full p-2 placeholder-gray-400 focus:placeholder-gray-300 placeholder-top text-gray-500"
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
                    id: uuidv4(),
                    price,
                    title,
                    size,
                    color,
                    website,
                    image: preiview,
                    description,
                    short_desc: shortDescription,
                    category_type: category,
                    subcategory_type: subCategoryType,
                    quantity,
                  })
                )
              }
              type="submit"
              className="w-44 bg-indigo-400 text-white py-1 px-2 rounded"
            >
              Add
            </button>
            {/* <Link
              to="/"
              className="p-1 bg-gray-700 text-white flex justify-center items-center h-12 w-2/5 rounded-md"
            >
              Cancel
            </Link> */}
          </div>
        </form>
      </DialogComponent>
    </div>
  );
};

export default AddDialog;
