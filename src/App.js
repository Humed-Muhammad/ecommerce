import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar.jsx";
import Add from "./Components/AddProduct.jsx";
import Home from "./Components/Home.jsx";
import Cart from "./Components/Cart.jsx";
import Products from "./Components/Products.jsx";
import Register from "./Components/users/Register.jsx";
import Login from "./Components/users/Login.jsx";
import AddCategories from "./Components/AddCategories.jsx";
import AddMajorCategory from "./Components/admin/AddMajorCategory.jsx";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

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
        <Route path="/add">
          <Add />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/major">
          <AddMajorCategory />
        </Route>
        <Route path={`/products/${path}`}>
          <Products path={path} />
        </Route>
        <Route path="/cat">
          <AddCategories />
        </Route>
        <Route exact path="/">
          <Home setPath={setPath} />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          {loggedInStatus && <Redirect path="/" />}
          <Login />
        </Route>
      </Router>
    </div>
  );
}

export default App;
