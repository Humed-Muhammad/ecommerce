import React, { useState, useEffect } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { getApi } from "../../api/admin";

const Catagory = ({ setSubCategoryType, categoryId }) => {
  let [response, setResponse] = useState({ status: "", message: "" });
  useEffect(() => {
    const fetchData = async () => {
      let { status, message } = await getApi("get-all-category");

      setResponse({ status, message });
    };
    fetchData();
  }, []);

  let array = [];
  response.message &&
    response.message[1].map((item) => {
      if (item.majorId == categoryId) {
        array.push(item.sub_name);
      }
    });

  return (
    <Autocomplete
      className="w-64"
      id="free-solo-demo"
      onChange={(e, value) => setSubCategoryType(value)}
      options={array.map((option) => option)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Sub-Category"
          margin="normal"
          variant="outlined"
        />
      )}
    />
  );
};

export default Catagory;
