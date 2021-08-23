import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion } from "framer-motion";
import { postApi } from "../../api";
import Card from "./OrderCard.jsx";
import { getAllCartItems, decrement } from "../../redux/slice/Cart";
import ProductQuantityDialog from "./ProductQuantityDialog.jsx";
import { Link } from "react-router-dom";

const Order = () => {
  let { allCartItems, cartCount } = useSelector((state) => state.cartBucket);
  const dispatch = useDispatch();
  let [status, setStatus] = useState(false);
  let [openCheck, setOpenCheck] = useState(false);
  let [quantityPass, setQuantityPass] = useState([]);

  useEffect(() => {}, [cartCount, openCheck, quantityPass]);

  return (
    <div className="bg-white mt-40  w-full flex  justify-base items-center">
      <ProductQuantityDialog
        openCheck={openCheck}
        setOpenCheck={setOpenCheck}
        quantityPass={quantityPass}
      />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1>Your Orders</h1>
        {status && (
          <motion.div
            initial={{ opacity: 0, x: "-50vw" }}
            animate={{ opacity: 1, x: 0 }}
            className="h-72 bg-white shadow-lg w-3/5 rounded-sm text-center flex justify-center items-center"
          >
            <h1 className="text-green-600">Your Order has been submitted</h1>
          </motion.div>
        )}
        <div className="bg-white  z-10 w-full flex flex-wrap justify-center items-center">
          {allCartItems.map((item) => (
            <Link to="/cart">
              <Card item={item} />
            </Link>
          ))}
        </div>
      </div>

      <div className="fixed w-full h-full flex flex-col justify-center items-center">
        <button
          className="fixed bottom-10 shadow-lg bg-gray-500 text-white w-44 py-1 px-2 mt-20 rounded-sm"
          onClick={async () => {
            let arrayId = [];
            allCartItems.map((item) => {
              arrayId.push(item.productId);
            });
            let { status, message } = await postApi(
              "check-product-quantity",
              arrayId
            );

            if (message) {
              setOpenCheck(true);
              setQuantityPass(message);
            } else {
              let { status } = await postApi("order", allCartItems);

              await postApi("delete-all-cart", localStorage.getItem("userId"));
              dispatch(decrement(0));
              setStatus(status);

              dispatch(getAllCartItems([]));
            }
          }}
        >
          Pay Order
        </button>
      </div>
    </div>
  );
};

export default Order;
