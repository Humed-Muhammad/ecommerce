import React, { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  getAllCartItems,
  removeCartItems,
  decrement,
  increment,
} from "../redux/slice/Cart";
import { addOrders } from "../redux/slice/product";
import { postApi } from "../api";

import { TrashIcon } from "@heroicons/react/solid";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import GifCart from "./users/gif/empty-cart.gif";
import { Link } from "react-router-dom";

import CartQuantityHandler from "./CartQuantityHandler";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Cart = () => {
  let [amount, setAmount] = useState("");
  let [open, setOpen] = useState(false);
  let [cartItem, setCartItem] = useState("");
  let [deleteId, setDeleteId] = useState([]);
  let [checked, setChecked] = useState(false);

  let { allCartItems, cartCount } = useSelector((state) => state.cartBucket);
  let dispatch = useDispatch();
  console.log(allCartItems);

  let inputRef = useRef();

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    let fetchData = async () => {
      let { status, message } = await postApi("get-cart", userId);
      dispatch(addOrders(allCartItems));
      dispatch(getAllCartItems(message));
      dispatch(increment(message.length));
    };
    fetchData();
    console.log(deleteId);
  }, [cartCount, amount, open, deleteId, checked]);
  console.log(allCartItems);

  let i = 0;

  allCartItems.map((item) => {
    i += Number(item.price);
  });

  let getCartIds = (id) => {
    setDeleteId([...deleteId, id]);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      {cartCount != 0 && localStorage.getItem("logged_in") ? (
        <div className="mt-24 w-4/5  shadow-lg bg-white flex flex-col justify-center items-center pt-20 md:mt-20">
          <table className="w-full">
            <tr className="w-full flex justify-around items-center ">
              <th className="text-xl text-gray-600 text-center flex flex-1 justify-center items-center">
                Image
              </th>
              <th className="text-xl text-gray-600 text-center flex flex-1 justify-center items-center">
                Name
              </th>
              <th className="text-xl text-gray-600 text-center flex flex-1 justify-center items-center">
                Color
              </th>
              <th className="text-xl text-gray-600 text-center flex flex-1 justify-center items-center mr-5">
                Type
              </th>
              <th className="text-xl text-gray-600 text-center flex flex-1 justify-center items-center">
                Price
              </th>
              <th className="text-xl text-gray-600 text-center flex flex-1 justify-center items-center">
                Quantity
              </th>
              <th className="text-xl text-gray-600 text-center flex flex-1 justify-center items-center">
                <button
                  onClick={async () => {
                    postApi("delete-all-cart", localStorage.getItem("userId"));
                    window.location.reload();
                  }}
                  className="ml-2 text-sm py-1 px-2 bg-red-500 text-white rounded flex-1"
                >
                  Delete all
                </button>
              </th>
              <th className="text-xl text-gray-600 text-center flex flex-1 justify-center items-center">
                {deleteId.length != 0 && (
                  <TrashIcon
                    onClick={async () => {
                      if (deleteId.length != 0) {
                        await postApi("delete-cart", deleteId);
                        setDeleteId([]);
                      }
                    }}
                    className="text-gray-500 rounded font-normal h-6 mr-1 cursor-pointer flex-1"
                  />
                )}
              </th>
            </tr>
            {allCartItems.map((item, id) => (
              <tr className="flex flex-1 justify-center items-center border-b border-t border-gray-300 m-1 text-gray-500 font-normal text-sm">
                <td className="w-full flex justify-around items-center">
                  <div className="flex-1 flex justify-center items-center">
                    <img
                      src={item.image}
                      alt="Sample"
                      className="h-12 w-12 object-cover bg-position-top "
                    />
                  </div>

                  <div className="text-center flex flex-1">{item.title}</div>

                  <div className="ml-3 text-center flex flex-1">
                    {" "}
                    {item.color}
                  </div>

                  <div className="text-center flex flex-1 mr-5">
                    {item.sub_category_type.toLowerCase()}
                  </div>

                  <div className="text-center flex flex-1 price">
                    ${item.price}
                  </div>
                  <CartQuantityHandler item={item} setAmount={setAmount} />
                  <TrashIcon
                    onClick={async () => {
                      setOpen(true);
                      setCartItem(item);
                    }}
                    className="ml-2 text-red-500 rounded font-normal h-6 mr-1 cursor-pointer flex-1"
                  />
                  <input
                    ref={inputRef}
                    onChange={(e) => {
                      setChecked(e.target.checked);
                      if (e.target.checked) {
                        getCartIds(item.id);
                      } else if (!e.target.checked) {
                        setDeleteId(
                          deleteId.filter((value) => value != item.id)
                        );
                        console.log(item.id);
                      }
                    }}
                    className="text-blue-600 flex flex-1"
                    type="checkbox"
                    name=""
                    id=""
                  />
                </td>
              </tr>
            ))}
            <div>
              <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={() => setOpen(false)}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
              >
                <DialogTitle id="alert-dialog-slide-title">Delete</DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-slide-description">
                    Are you sure you want to delete this item!
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpen(false)} color="primary">
                    Cancle
                  </Button>
                  <Button
                    onClick={async () => {
                      let data = await postApi("delete-cart", [cartItem.id]);
                      dispatch(removeCartItems(cartItem));
                      dispatch(decrement(-1));
                      console.log(data);

                      setOpen(false);
                    }}
                    color="primary"
                  >
                    Ok
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </table>
          <div
            className="e-card e-card-horizontal ml-2 mr-2 mb-2 mt-20 bg-gray-300"
            style={{ width: `400px` }}
          >
            <div className="text-gray-600 text-xl text-center">Total: ${i}</div>
            <Link
              style={{ color: "white" }}
              className=" bg-gray-700 text-center"
              to="/order"
            >
              Checkout
            </Link>
          </div>
        </div>
      ) : (
        <div className="h-screen w-screen flex flex-col justify-center items-center">
          <img src={GifCart} alt="" />
          <h1 className="text-gray-500 pt-5 text-lg">
            Ooops your cart looks like empty
          </h1>
          <Link
            to="/"
            className="text-gray-700 border border-blue-500 rounded-sm mt-3 py-1 px-2"
          >
            Shop now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
