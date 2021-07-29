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
