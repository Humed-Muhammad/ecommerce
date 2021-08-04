import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../../api";

const Login = () => {
  let [type, setType] = useState(true);
  let [userData, setUserData] = useState({ email: "", password: "" });
  let [response, setResponse] = useState({ status: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    let { status, message } = await loginUser("login", userData);
    setResponse({ status, message });
    if (status) {
      localStorage.setItem("logged_in", status);
      localStorage.setItem("userEmail", message.email);
    }
  };
  console.log(response);

  return (
    <div>
      <div className="w-screen h-screen bg-gray-100 flex flex-col items-center justify-center ">
        {response.status && (
          <div className="bg-white w-4/5 h-24 flex justify-center items-center mb-10">
            <h1 className="text-gray mr-3">Succussfully Loged In</h1>
            <Link className="text-blue-500" to="/">
              {" "}
              Go To Home
            </Link>
          </div>
        )}
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="w-96 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <p className="text-red-500">
            {typeof response.message != "object" && response.message}
          </p>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email<div></div>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-700"
              id="email"
              type="text"
              placeholder="Email"
              name="email"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <p className="text-red-500">
              {response.message && response.message["email"]}
            </p>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>

            <input
              className="js-password shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:border-blue-700"
              id="password"
              type={type ? "password" : "text"}
              placeholder="password"
              name="password"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <p className="text-red-500">
              {response.message && response.message["password"]}
            </p>
            <input
              className="hidden js-password-toggle"
              id="toggle"
              type="checkbox"
            />
            <label
              onClick={() => setType(!type)}
              className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
              htmlFor="toggle"
            >
              {type ? "show" : "hide"}
            </label>
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <Link
            to="/register"
            className="mt-10 inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Sign up
          </Link>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2020 Humed-Pizza. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;
