import React, { useState, useEffect } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { major_categories } from "../../../api";

const Dropdown = () => {
  let [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let { status, message } = await major_categories();
      let array = [];

      message[0].map((item) => {
        array.push(item.major_category);
      });

      setData(await array);
    };
    fetchData();
  }, []);
  console.log(data);
  return (
    // specifies the tag for render the DropDownList component
    <DropDownListComponent
      id="ddlelement"
      dataSource={data}
      placeholder="Select category"
      showClearButton
    />
  );
};

export default Dropdown;
