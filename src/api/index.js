import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const rootUrl = "http://localhost/ecommers/server/index.php/api/";

// renewed API

// headers for axios
const options = {
  headers: {
    "X-API-KEY": "humed12345",
    "Content-Type": "application/json",
  },
};

// get request handler
export const getApi = async (url) => {
  return axios
    .get(rootUrl + url, options)
    .then(({ data }) => data)
    .catch((error) => console.log(error));
};

//post request handler
export const postApi = async (url, data) => {
  const formData = new FormData();
  if (typeof data == "string") {
    formData.append("data", data);
  } else {
    formData.append("data", JSON.stringify(data));
  }
  return axios
    .post(rootUrl + url, formData, options)
    .then(({ data }) => data)
    .catch((error) => console.log(error));
};

/*--- special routes----*/
// login
export const loginUser = async (url, userData) => {
  let formData = new FormData();
  formData.append("email", userData["email"]);
  formData.append("password", userData["password"]);

  return axios
    .post(rootUrl + url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};

// register
export const registerUser = async (url, userData) => {
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
    .post(rootUrl + url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => console.log(error));
};

// api routes

// admin
const add_product_url = "add-product";

const edit_product_url = "edit-product";

//user
const home_url = "home";
const add_major_url = "add_major";
const get_all_catagory_url = "get-all-category";
const category_url = "category";
const add_category_url = "add_category";

const addCart_url = "add-cart";
const getCart_url = "get-cart";
const quantityCart_url = "quantity-cart";

const priceCart_url = "price-cart";

const deleteCart_url = "delete-cart";

const deleteAllCart_url = "delete-all-cart";

const getProducts_url = "get-all-products";

const deleteProducts_url = "delete-product";

//orders api
const order_url = "order";
const getUserOrder_url = "get-user-order";
const getAllrOrder_url = "get-all-order";

const checkPQ_url = "check-product-quantity";

// user api
const signup_url = "signup";
const login_url = "login";
const change_profile_url = "change-profile";
const pass_user_url = "pass_user";

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

  formData.append("data", JSON.stringify(products[0]));

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
