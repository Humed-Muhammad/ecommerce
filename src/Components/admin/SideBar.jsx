import React, { useState } from "react";
import logo from "./xing.png";
import pp from "./pp.jpg";
import { Link } from "react-router-dom";
import { CreditCardIcon } from "@heroicons/react/outline";

const SideBar = () => {
  let [type, setType] = useState(0);
  return (
    <div className="h-full w-60 flex flex-col justify-between items-center bg-white shadow-lg">
      <div className="w-full bg-gray-100 h-16 flex justify-center items-center px-2">
        <img className="h-6" src={logo} alt="" />
        <h1 className="text-xl text-green-500">Admin-Shophub</h1>
      </div>
      <div className="h-80 flex flex-col justify-center items-center">
        <img
          className="h-24 w-24 object-cover rounded-full mb-2"
          src={pp}
          alt=""
        />
        <h1 className="text-xl text-gray-600 mb-2">Humed Essie</h1>
        <div className="bg-green-500 py-2 px-3 text-center text-white rounded-sm w-full flex justify-center items-center">
          <CreditCardIcon className="h-5 text-gray-500 mr-1" />
          $2054
        </div>
      </div>
      <div className="flex flex-col justify-base items-center flex-1">
        <Link
          to="/"
          onClick={() => setType(0)}
          className={`mb-5 ${
            type == 0 ? "bg-green-400 text-white" : "bg-none text-gray-600"
          }  w-full text-center py-1 px-2 rounded`}
        >
          Dashbaord
        </Link>
        <Link
          to="/transaction"
          onClick={() => setType(1)}
          className={`mb-5 ${
            type == 1 ? "bg-green-400 text-white" : "bg-none text-gray-600"
          }  w-full text-center py-1 px-2 rounded`}
        >
          Transaction
        </Link>
        <Link
          to="/category"
          onClick={() => setType(2)}
          className={`mb-5 ${
            type == 2 ? "bg-green-400 text-white" : "bg-none text-gray-600"
          }  w-full text-center py-1 px-2 rounded`}
        >
          Category
        </Link>
        <Link
          to="/products"
          onClick={() => setType(3)}
          className={`mb-5 ${
            type == 3 ? "bg-green-400 text-white" : "bg-none text-gray-600"
          }  w-full text-center py-1 px-2 rounded`}
        >
          Products
        </Link>
      </div>
    </div>
  );
};

export default SideBar;
