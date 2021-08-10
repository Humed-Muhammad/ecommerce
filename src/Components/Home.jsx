import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { getApi, postApi } from "../api";
import { getAllMajorCategory, getAllSubCategory } from "../redux/slice/product";
import { useDispatch } from "react-redux";
import "./home.css";
import { CircularProgress } from "@material-ui/core";

import AllCard from "./AllCard.jsx";

const Home = ({ setPath }) => {
  const dispatch = useDispatch();
  let [response, setResponse] = useState({ status: "", message: [] });

  useEffect(() => {
    let fetchData = async () => {
      let { status, message } = await getApi("home");

      setResponse({ status, message });

      if (status) {
        dispatch(getAllMajorCategory(await message[0]));
        dispatch(getAllSubCategory(await message[1]));
      }
      let loggedInStatus = localStorage.getItem("logged_in");
      let userEmail = localStorage.getItem("userEmail");

      if (loggedInStatus) {
        let {
          status,
          message: { token },
        } = await postApi("pass_user", userEmail);
        let {
          data: { id, email, name },
        } = jwtDecode(token);

        localStorage.setItem("userId", id);
      }
    };

    fetchData();
  }, []);

  return (
    <div className=" h-screen w-screen flex flex-col jistify-center items-center bg-gray-100 mt-40 md:mt-20">
      <div className="home h-2/5 w-11/12 md:w-6/12 mt-10 rounded-md flex flex-col jistify-center items-center bg-gray-100 xl:w-2/5">
        <div className=" h-96 flex flex-col jistify-around items-center mt-10">
          <h1 className="text-gray-700 text-xl font-bold mb-5 sm:text-2xl md:text-4xl">
            Welcome to Shophub
          </h1>
          <p className="text-md text-gray-900 mb-5 ">Know with 50% off!</p>
          <button className="bg-blue-600 text-white py-2 px-3 w-32 rounded-md">
            Shop Now
          </button>
        </div>
      </div>
      {response.status ? (
        <AllCard setPath={setPath} />
      ) : (
        <div className="h-96 flex justify-center items-center">
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default Home;
