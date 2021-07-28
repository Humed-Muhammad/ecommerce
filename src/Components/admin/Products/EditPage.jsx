import React, { useState, useEffect } from "react";
import { DialogComponent } from "@syncfusion/ej2-react-popups";

import { addProduct } from "../../../redux/slice/product";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "../CategoryBoard/Dropdown.tsx";
import Subdropdown from "../CategoryBoard/Subdropdown.tsx";
import { edit_product } from "../../../api";

const EditDialog = ({ setOpen, open, setEditing, editData }) => {
  let [title, setTitle] = useState(editData.title);
  let [price, setPrice] = useState(editData.price);
  let [website, setWebsite] = useState(editData.website);
  let [color, setColor] = useState(editData.color);
  let [size, setSize] = useState(editData.size);
  let [quantity, setQuantity] = useState(editData.quantity);
  let [preiview, setPreview] = useState("");
  let [description, setDescription] = useState(editData.description);
  let [shortDescription, setShortDescription] = useState(editData.short_desc);
  let [category, setCategory] = useState(editData.category);
  let [subCategoryType, setSubCategoryType] = useState(
    editData.subCategoryType
  );

  const { products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { status } = await edit_product(products[0]);
    if (status) {
      window.location.reload();
    }
  };
  console.log(editData);

  return (
    <div className="flex flex-1 justify-center items-center" id="dialog-target">
      <DialogComponent
        width="60%"
        height="100%"
        target="#dialog-target"
        visible={open}
        close={() => {
          setOpen(false);
          setEditing(false);
        }}
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
            <Dropdown editData={editData} setCategory={setCategory} />
            <Subdropdown
              editData={editData}
              setSubCategoryType={setSubCategoryType}
            />
          </div>
          <div className="flex flex-col justify-around items-center w-full md:flex-row">
            <div className="w-full flex flex-col justify-center items-center">
              <label className="text-gray-500">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="outline-none border-b border-indigo-600 mb-5 mr-2 bg-white p-2 w-11/12 mr-5 placeholder-gray-400 focus:placeholder-gray-300 border-b border-gray-200 "
                type="text"
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <label className="text-gray-500">Price</label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Price"
                className="outline-none border-b border-indigo-600 mb-5 mr-2 bg-white p-2 w-11/12 placeholder-gray-400 focus:placeholder-gray-300 border-b border-gray-200 "
                type="text"
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <label className="text-gray-500">Quantity</label>
              <input
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="quantity"
                className="outline-none border-b border-indigo-600 mb-5 mr-2 bg-white p-2 w-11/12 placeholder-gray-400 focus:placeholder-gray-300 border-b border-gray-200 "
                type="text"
              />
            </div>
          </div>
          <div className="flex flex-col justify-around items-center w-full md:flex-row ">
            <div className="w-full flex flex-col justify-center items-center">
              <label className="text-gray-500">Website</label>
              <input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="Website"
                className="outline-none border-b border-indigo-600 mb-5 mr-2 bg-white p-2 w-11/12 placeholder-gray-400 focus:placeholder-gray-300 border-b border-gray-200 "
                type="text"
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <label className="text-gray-500">Size</label>
              <input
                value={size}
                onChange={(e) => setSize(e.target.value)}
                placeholder="Size"
                className="outline-none border-b border-indigo-600 mb-5 mr-2 bg-white p-2 w-11/12 placeholder-gray-400 focus:placeholder-gray-300 border-b border-gray-200 "
                type="text"
              />
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <label className="text-gray-500">Color</label>
              <input
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="Color"
                className="outline-none border-b border-indigo-600 mb-5 mr-2 bg-white p-2 w-11/12 placeholder-gray-400 focus:placeholder-gray-300 border-b border-gray-200 "
                type="text"
              />
            </div>
          </div>
          <div className="w-full flex flex-col justify-center items-center">
            <label className="text-gray-500">Short Description</label>
            <textarea
              onChange={(e) => setShortDescription(e.target.value)}
              placeholder="Short description"
              className="outline-none border-b border-indigo-600 mb-5 mr-2 h-24 w-full p-2 placeholder-gray-400 focus:placeholder-gray-300 placeholder-top text-gray-500"
              name="text"
              id=""
              cols="30"
              rows="10"
            >
              {shortDescription}
            </textarea>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Full description"
              className="outline-none border-b border-indigo-600 mb-5 mr-2 h-48 w-full p-2 placeholder-gray-400 focus:placeholder-gray-300 placeholder-top text-gray-500"
              name="text"
              id=""
              cols="30"
              rows="10"
            >
              {description}
            </textarea>
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
                    id: editData.id,
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
          </div>
        </form>
      </DialogComponent>
    </div>
  );
};

export default EditDialog;
