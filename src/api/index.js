import axios from "axios";
import { v4 as uuidv4 } from "uuid";

const add_product_url =
  "http://localhost/ecommers/server/index.php/api/add-product";

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
const getProducts_url =
  "http://localhost/ecommers/server/index.php/api/get-all-products";

// user api
const signup_url = "http://localhost/ecommers/server/index.php/api/signup";
const login_url = "http://localhost/ecommers/server/index.php/api/login";
const pass_user_url =
  "http://localhost/ecommers/server/index.php/api/pass_user";

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
  formData.append("id", uuidv4());
  formData.append("price", products[0]["price"]);
  formData.append("title", products[0]["title"]);
  formData.append("size", products[0]["size"]);
  formData.append("color", products[0]["color"]);
  formData.append("website", products[0]["website"]);
  formData.append("image", products[0]["image"]);
  formData.append("quantity", products[0]["quantity"]);
  formData.append("categoryType", products[0]["categoryType"]);
  formData.append("subCategoryType", products[0]["subCategoryType"]);
  formData.append("description", products[0]["description"]);
  formData.append("shortDescription", products[0]["shortDescription"]);

  return axios
    .post(add_product_url, formData, options)
    .then(({ data }) => {
      return data;
    })
    .catch((error) => {
      console.log(error);
    });
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

export const getAllProducts = async () => {
  return axios
    .get(getProducts_url, options)
    .then(({ data }) => {
      return data;
    })
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
