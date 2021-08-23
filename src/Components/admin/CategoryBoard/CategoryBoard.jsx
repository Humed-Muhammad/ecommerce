import React, { useEffect, useState } from "react";
import { getApi } from "../../../api/admin";
import "@syncfusion/ej2-layouts/styles/material.css";
import { motion } from "framer-motion";
import TopBar from "../TopBar";
import CategoryDailog from "./CategoryDailog.jsx";
import Dropdown from "./Dropdown.tsx";

let parent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

let child = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const CategoryBoard = () => {
  let [response, setResponse] = useState({ status: "", message: "" });
  let [open, setOpen] = useState(false);
  let [id, setId] = useState("");
  let [category, setCategory] = useState();
  useEffect(() => {
    let fetchData = async () => {
      let { status, message } = await getApi("get-all-category");
      setResponse({ status, message });
    };
    fetchData();
  }, []);

  let handleList = (id) => {
    setId(id);
  };

  return (
    <motion.div
      variants={parent}
      initial="hidden"
      animate="visible"
      className="w-full border-r border-gray-300 flex h-full flex-col justify-between items-center"
    >
      <TopBar name={"Category"} />
      <div className="w-full flex justify-around items-center">
        <h1 className="text-lg text-gray-400">Category List</h1>
        <CategoryDailog open={open} setOpen={setOpen} />
        <div className="flex justify-center items-center">
          <Dropdown setCategory={setCategory} />
          <button
            onClick={() => setOpen(true)}
            className="bg-gray-700 text-white py-1 px-3 rounded-sm w-44 text-sm"
          >
            Add Category
          </button>
        </div>
      </div>
      <div className="w-full h-4/5 flex flex-wrap justify-center items-base">
        {response.message &&
          response.message[0].map((item) => (
            <motion.div
              onClick={() => handleList(item.id)}
              variants={child}
              className="e-card e-card-horizontal m-2 h-36 pb-2 cursor-pointer"
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
                    <div className="e-card-header-title">Product</div>
                  </div>
                </div>
                <div className="e-card-content">{item.major_category}</div>
              </div>
              {/* <Subdropdown id={id} setId={setId} /> */}
            </motion.div>
          ))}
      </div>
    </motion.div>
  );
};

export default CategoryBoard;
