import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// api routes

// admin
const add_product_url =
  "http://localhost/ecommers/server/index.php/api/add-product";

const edit_product_url =
  "http://localhost/ecommers/server/index.php/api/edit-product";

//user
const home_url = "http://localhost/ecommers/server/index.php/api/home";
const add_major_url =
  "http://localhost/ecommers/server/index.php/api/add_major";
const get_all_catagory_url =
  "http://localhost/ecommers/server/index.php/api/get-all-category";
const category_url = "http://localhost/ecommers/server/index.php/api/category";
const add_category_url =
  "http://localhost/ecommers/server/index.php/api/add_category";

const addCart_url = "http://localhost/ecommers/server/index.php/api/add-cart";
const getCart_url = "http://localhost/ecommers/server/index.php/api/get-cart";
const quantityCart_url =
  "http://localhost/ecommers/server/index.php/api/quantity-cart";

const priceCart_url =
  "http://localhost/ecommers/server/index.php/api/price-cart";

const deleteCart_url =
  "http://localhost/ecommers/server/index.php/api/delete-cart";

const deleteAllCart_url =
  "http://localhost/ecommers/server/index.php/api/delete-all-cart";

const getProducts_url =
  "http://localhost/ecommers/server/index.php/api/get-all-products";

const deleteProducts_url =
  "http://localhost/ecommers/server/index.php/api/delete-product";

//orders api
const order_url = "http://localhost/ecommers/server/index.php/api/order";
const getUserOrder_url =
  "http://localhost/ecommers/server/index.php/api/get-user-order";
const getAllrOrder_url =
  "http://localhost/ecommers/server/index.php/api/get-all-order";

const checkPQ_url =
  "http://localhost/ecommers/server/index.php/api/check-product-quantity";

// user api
const signup_url = "http://localhost/ecommers/server/index.php/api/signup";
const login_url = "http://localhost/ecommers/server/index.php/api/login";
const change_profile_url =
  "http://localhost/ecommers/server/index.php/api/change-profile";
const pass_user_url =
  "http://localhost/ecommers/server/index.php/api/pass_user";

// headers for axios
const options = {
  headers: {
    "X-API-KEY": "humed12345",
    "Content-Type": "application/json",
  },
};

export const home = async () => {
  let { data } = await axios.get(home_url, options);
  return data;
};

export const major_categories = async () => {
  return axios
    .get(get_all_catagory_url, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const categoryProducts = async (keyword) => {
  let formData = new FormData();
  formData.append("keyword", keyword);
  return axios
    .post(category_url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const add_products = async (products) => {
  let formData = new FormData();
  // formData.append("id", uuidv4());
  formData.append("data", JSON.stringify(products[0]));
  // formData.append("price", products[0]["price"]);
  // formData.append("title", products[0]["title"]);
  // formData.append("size", products[0]["size"]);
  // formData.append("color", products[0]["color"]);
  // formData.append("website", products[0]["website"]);
  // formData.append("image", products[0]["image"]);
  // formData.append("quantity", products[0]["quantity"]);
  // formData.append("categoryType", products[0]["categoryType"]);
  // formData.append("subCategoryType", products[0]["subCategoryType"]);
  // formData.append("description", products[0]["description"]);
  // formData.append("shortDescription", products[0]["shortDescription"]);

  return axios
    .post(add_product_url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const edit_product = async (editData) => {
  let formData = new FormData();
  formData.append("data", JSON.stringify(editData));

  return axios
    .post(edit_product_url, formData, options)
    .then(({ data }) => data)
    .catch((error) => console.log(error));
};

export const add_category = async (categories) => {
  let formData = new FormData();
  formData.append("major", categories["major"]);
  formData.append("subName", categories["subName"]);

  return axios
    .post(add_category_url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const addMajor = async (major) => {
  let formData = new FormData();
  formData.append("image", major["image"]);
  formData.append("name", major["name"]);
  return axios
    .post(add_major_url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const addCart = async (cartData) => {
  let formData = new FormData();

  formData.append("userId", localStorage.getItem("userId"));
  formData.append("title", cartData[0]["title"]);
  formData.append("productId", cartData[0]["id"]);
  formData.append("categoryId", cartData[0]["categoryId"]);
  formData.append("subcategoryId", cartData[0]["subcategoryId"]);
  formData.append("color", cartData[0]["color"]);
  formData.append("image", cartData[0]["image"]);
  formData.append("website", cartData[0]["website"]);
  formData.append("price", cartData[0]["price"]);
  formData.append("short_desc", cartData[0]["shortDesc"]);
  formData.append("quantity", cartData[0]["quantity"]);

  return axios
    .post(addCart_url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const getCart = async (userId) => {
  let formData = new FormData();
  formData.append("userId", userId);
  return axios
    .post(getCart_url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
};
export const deleteCart = async (id) => {
  let formData = new FormData();
  formData.append("id", id);
  return axios
    .post(deleteCart_url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const deleteAllCart = async (userId) => {
  let formData = new FormData();
  formData.append("userId", userId);
  return axios
    .post(deleteAllCart_url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const cartQuantity = async (id, value, productId) => {
  let formData = new FormData();
  formData.append("id", id);
  formData.append("productId", productId);
  formData.append("amount", value);

  return axios
    .post(quantityCart_url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const cartPrice = async (id, value, priceResult) => {
  let formData = new FormData();
  formData.append("id", id);
  formData.append("priceResult", priceResult);
  formData.append("price", value);
  return axios
    .post(priceCart_url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const getAllProducts = async () => {
  return axios
    .get(getProducts_url, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};
export const deleteProducts = async (id) => {
  let formData = new FormData();
  formData.append("id", id);
  return axios
    .post(deleteProducts_url, formData, options)
    .then(({ data }) => {
      console.log(data);
    })
    .catch((error) => console.log(error));
};

//order api
export const addOrder = async (orderData) => {
  let formData = new FormData();
  formData.append("data", JSON.stringify(orderData));

  return axios
    .post(order_url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const getUserOrder = async (userId) => {
  let formData = new FormData();
  formData.append("userId", userId);
  return axios
    .post(getUserOrder_url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const checkProductQuantity = async (arrayId) => {
  let formData = new FormData();
  formData.append("productIdArray", JSON.stringify(arrayId));
  return axios
    .post(checkPQ_url, formData, options)
    .then(({ data }) => data)
    .catch((error) => console.log(error));
};

// user api request
export const addUser = async (userData) => {
  let formData = new FormData();
  formData.append("id", uuidv4());
  formData.append("firstname", userData[0]["firstName"]);
  formData.append("lastname", userData[0]["lastName"]);
  formData.append("email", userData[0]["email"]);
  formData.append("password", userData[0]["password"]);
  formData.append("phone", userData[0]["phone"]);
  formData.append("country", userData[0]["country"]);
  formData.append("birthDate", userData[0]["birthDate"]);
  return axios
    .post(signup_url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const authonticateUser = async (userData) => {
  let formData = new FormData();
  formData.append("email", userData[0]["email"]);
  formData.append("password", userData[0]["password"]);

  axios
    .post(login_url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const loginUser = async (userData) => {
  let formData = new FormData();
  formData.append("email", userData["email"]);
  formData.append("password", userData["password"]);

  return axios
    .post(login_url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const passUser = async (email) => {
  let formData = new FormData();
  formData.append("email", email);

  return axios
    .post(pass_user_url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};

export const changeProfile = async (image, id) => {
  let formData = new FormData();
  formData.append("image", image);
  formData.append("id", id);

  return axios
    .post(change_profile_url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};
