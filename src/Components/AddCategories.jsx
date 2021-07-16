import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Category from "./admin/Category.jsx";
import { add_category } from "../api";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    width: "100%",
    height: 500,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
  },
  items: {
    margin: 5,
  },
}));

export default function BasicTextFields() {
  let [category, setCategory] = useState({ major: "", subName: "" });

  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await add_category(category);
    console.log(data);
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className={`${classes.root} bg-white rounded shadow-lg`}
      noValidate
      autoComplete="off"
    >
      <div className="w-full flex flex-col justify-center items-center">
        <Category category={category} setCategory={setCategory} />
        <TextField
          onChange={(e) =>
            setCategory({ ...category, subName: e.target.value })
          }
          className={classes.items}
          id="filled-basic"
          label="Sub-Category-one"
          variant="filled"
        />
      </div>

      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </form>
  );
}
