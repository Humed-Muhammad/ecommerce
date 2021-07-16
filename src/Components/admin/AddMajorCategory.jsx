import React, { useState, useEffect, useRef } from "react";
import { addMajor } from "../../api";

const AddMajorCategory = () => {
  let [preview, setPreview] = useState("");
  let [name, setName] = useState("");
  let [opened, setOpened] = useState("");
  const majorData = { image: preview, name };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await addMajor(majorData);
    console.log(data);
  };

  const imageref = useRef();
  return (
    <div className="absolute w-4/5 top-20 h-3/5 flex flex-col justify-around items-center">
      {preview && <img className="w-2/5 object-cover" src={preview} alt="" />}
      <input
        onChange={(e) => setName(e.target.value)}
        id="filled-basic"
        label="Category Name"
        variant="filled"
        placeholder="Category name"
        className="border border-gray-400 py-1 px-3 rounded-sm outline-none "
      />
      <div className="w-full flex flex-wrap justify-around items-center">
        <button
          onClick={() => imageref.current.click()}
          className="text-white bg-gray-500 py-1 px-2 rounded ml-2"
        >
          Select image
        </button>
        <input
          accept="image/*"
          onChange={(e) => {
            const files = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreview(reader.result);
            };
            reader.readAsDataURL(files);
          }}
          ref={imageref}
          hidden
          type="file"
        />
        <button
          onClick={(e) => {
            if (preview && name) {
              handleSubmit(e);
              window.location.reload();
            } else {
              alert("Please Fill the Neccessary Portion");
            }
          }}
          type="submit"
          className="bg-green-500 py-1 px-2 rounded-md shadow-md text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddMajorCategory;
