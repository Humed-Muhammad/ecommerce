import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserOrder,
  addOrder,
  deleteAllCart,
  checkProductQuantity,
} from "../../api";
import Card from "./OrderCard.jsx";
import {
  getAllCartItems,
  removeCartItems,
  decrement,
} from "../../redux/slice/Cart";
import ProductQuantityDialog from "./ProductQuantityDialog.jsx";

const Order = () => {
  let { allCartItems, cartCount } = useSelector((state) => state.cartBucket);
  const dispatch = useDispatch();
  let [status, setStatus] = useState(false);
  let [openCheck, setOpenCheck] = useState(false);
  let [quantityPass, setQuantityPass] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    let fetchData = async () => {
      let data = await getUserOrder(userId);
      console.log(data);
    };
    fetchData();
    console.log(allCartItems);
  }, [cartCount, openCheck, quantityPass]);

  return (
    <div className="bg-white mt-40  w-full flex  justify-base items-center">
      <ProductQuantityDialog
        openCheck={openCheck}
        setOpenCheck={setOpenCheck}
        quantityPass={quantityPass}
      />
      <div className="w-full h-full flex flex-col justify-center items-center">
        <h1>Your Orders</h1>
        <div className="bg-white  z-10 w-full flex flex-wrap justify-center items-center">
          {allCartItems.map((item) => (
            <Card item={item} />
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
            let { message } = await checkProductQuantity(arrayId);
            console.log(message);

            message.map(async (item) => {
              if (item.quantity == 0) {
                setOpenCheck(true);
                setQuantityPass([...quantityPass, await item]);
              } else {
                let { status, message } = await addOrder(allCartItems);
                let data = await deleteAllCart(localStorage.getItem("userId"));
                dispatch(decrement(0));
                setStatus(status);
                console.log(message);
                dispatch(getAllCartItems([]));
                console.log(data);
              }
            });
          }}
        >
          Pay Order
        </button>
      </div>
    </div>
  );
};

export default Order;
