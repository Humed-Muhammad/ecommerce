import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar.jsx";
import Home from "./Components/Home.jsx";
import Cart from "./Components/Cart.jsx";
import Products from "./Components/Products.jsx";
import Register from "./Components/users/Register.jsx";
import Login from "./Components/users/Login.jsx";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import UserProfile from "./Components/users/UserProfile.jsx";
import Order from "./Components/users/Order";

function App() {
  let [path, setPath] = useState("" || localStorage.getItem("path"));

  let loggedInStatus = localStorage.getItem("logged_in");
  let cartCount = localStorage.getItem("cartCount");

  useEffect(() => {
    console.log(cartCount);
  }, [cartCount]);

  return (
    <div className="bg-gray-white flex flex-col justify-center items-center ">
      <Router className="flex flex-col justify-center items-center ">
        <Navbar />
        <Route path="/order">
          {loggedInStatus ? null : <Redirect path="/" />}
          <Order />
        </Route>
        <Route path="/profile">
          {loggedInStatus ? null : <Redirect path="/" />}
          <UserProfile />
        </Route>
        <Route path="/cart">
          {loggedInStatus ? null : <Redirect path="/" />}
          <Cart />
        </Route>
        <Route path={`/products/${path}`}>
          <Products path={path} />
        </Route>
        <Route exact path="/">
          <Home setPath={setPath} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          {loggedInStatus ? <Redirect path="/" /> : <Login />}
        </Route>
      </Router>
    </div>
  );
}

export default App;
