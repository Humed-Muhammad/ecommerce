import React, { useState, useEffect } from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";

import TextField from "@material-ui/core/TextField";
import { getApi } from "../../api/admin";

const Catagory = ({ category, setCategory, setCategoryId }) => {
  let [response, setResponse] = useState({ status: "", message: "" });
  useEffect(() => {
    const fetchData = async () => {
      let { status, message } = await getApi("get-all-category");

      setResponse({ status, message });
    };
    fetchData();
  }, []);

  return (
    <Autocomplete
      className="w-64"
      onChange={(e, value) => {
        setCategory(value);
        response.message &&
          response.message[0].map((item) => {
            if (item.major_category == value) {
              setCategoryId(item.id);
            }
          });
      }}
      options={
        response.message &&
        response.message[0].map((option) => option.major_category)
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Category"
          margin="normal"
          variant="outlined"
        />
      )}
    />
  );
};

export default Catagory;
