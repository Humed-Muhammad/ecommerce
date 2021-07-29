import React, { useState, useEffect } from "react";

import Autocomplete from "@material-ui/lab/Autocomplete";

import TextField from "@material-ui/core/TextField";
import { getApi } from "../../api/admin";

const Catagory = ({ category, setCategory }) => {
  let [response, setResponse] = useState({ status: "", message: "" });
  useEffect(() => {
    const fetchData = async () => {
      let { status, message } = await getApi("get-all-category");

      setResponse({ status, message });
    };
    fetchData();
  }, []);
  console.log(response);
  console.log(category);

  return (
    <Autocomplete
      className="w-80"
      id="free-solo-demo"
      onChange={(e, value) => setCategory({ ...category, major: value })}
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
