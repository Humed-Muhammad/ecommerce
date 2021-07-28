import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
import { cartQuantity, cartPrice } from "../api";

const CartQuantityHandler = ({ item, setAmount }) => {
  const handleAdd = async (id, value, increasedPrice, productId) => {
    let { status, message, priceResult } = await cartQuantity(
      id,
      value,
      productId
    );

    await cartPrice(id, increasedPrice, priceResult);
    setAmount(Math.random());
  };

  const handleMinus = async (id, value, increasedPrice, productId) => {
    let { status, message, priceResult } = await cartQuantity(
      id,
      value,
      productId
    );
    await cartPrice(id, increasedPrice, -priceResult);

    setAmount(Math.random());
  };

  return (
    <div className="justify-around items-center flex">
      {item.quantity <= 1 ? (
        <MinusIcon className="h-6 bg-gray-200 rounded text-white p-1 text-lg  mr-2" />
      ) : (
        <MinusIcon
          onClick={() => {
            handleMinus(
              item.id,
              Number(item.quantity) - 1,
              Number(item.price),
              item.productId
            );
            console.log(item.productId);
          }}
          className="h-6 bg-red-400 rounded text-white p-1 text-lg cursor-pointer mr-2"
        />
      )}

      <button>{item.quantity}</button>
      <PlusIcon
        onClick={() => {
          handleAdd(
            item.id,
            Number(item.quantity) + 1,
            Number(item.price),
            item.productId
          );
          console.log(item.productId);
        }}
        className="h-6 bg-gray-700 rounded text-white p-1 text-lg cursor-pointer ml-2"
      />
    </div>
  );
};

export default CartQuantityHandler;
