import "./App.css";
import { useState, useEffect, lazy, Suspense } from "react";
import Navbar from "./Components/Navbar.jsx";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
const UserProfile = lazy(() => import("./Components/users/UserProfile.jsx"));
const Order = lazy(() => import("./Components/users/Order"));

const Home = lazy(() => import("./Components/Home.jsx"));
const Cart = lazy(() => import("./Components/Cart.jsx"));
const Products = lazy(() => import("./Components/Products.jsx"));
const Register = lazy(() => import("./Components/users/Register.jsx"));
const Login = lazy(() => import("./Components/users/Login.jsx"));

function App() {
  let [path, setPath] = useState("" || localStorage.getItem("path"));

  let loggedInStatus = localStorage.getItem("logged_in");
  let cartCount = localStorage.getItem("cartCount");

  useEffect(() => {
    console.log(cartCount);
  }, [cartCount, loggedInStatus]);

  return (
    <div className="bg-gray-white flex flex-col justify-center items-center ">
      <Router className="flex flex-col justify-center items-center ">
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route path="/order">
              {loggedInStatus ? null : <Redirect to="/" />}
              <Order />
            </Route>
            <Route path="/profile">
              {loggedInStatus ? <UserProfile /> : <Redirect to="/" />}
            </Route>
            <Route path="/cart">
              {loggedInStatus ? null : <Redirect to="/" />}
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
              {loggedInStatus ? <Redirect to="/" /> : <Login />}
            </Route>
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
