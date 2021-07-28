import axios from "axios";

// urls
const totalPrice_url =
  "http://localhost/ecommers/server/index.php/api/get-product-price";

const getOrdersNumber_url =
  "http://localhost/ecommers/server/index.php/api/get-order-by-type";

// headers for axios
const options = {
  headers: {
    "X-API-KEY": "humed12345",
    "Content-Type": "application/json",
  },
};

export const getAllProductPrice = () => {
  return axios
    .get(totalPrice_url, options)
    .then(({ data }) => data)
    .catch((error) => console.log(error));
};

export const getOrderNums = (orderData) => {
  let formData = new FormData();

  formData.append("data", JSON.stringify(orderData));

  return axios
    .post(getOrdersNumber_url, formData, options)
    .then(({ data }) => data)
    .catch((error) => console.log(error));
};
