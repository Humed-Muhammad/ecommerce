import axios from "axios";

const rootUrl = "http://localhost/ecommers/server/index.php/api/";

// headers for axios
const options = {
  headers: {
    "X-API-KEY": "humed12345",
    "Content-Type": "application/json",
  },
};

export const getApi = (url) => {
  return axios
    .get(rootUrl + url, options)
    .then(({ data }) => data)
    .catch((error) => console.log(error));
};

export const postApi = (url, data) => {
  let formData = new FormData();

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
