import React, { useState, useEffect } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { major_categories } from "../../../api";

const Dropdown = (props:any) => {
  let [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let { status, message } = await major_categories();
      let array:any = [];

      console.log(message);

      message[0].map((item:any) => {
        array.push(item.major_category);
      });

      setData(await array);
    };
    fetchData();
  }, []);
  console.log(data);

  let handleChange = (args: any) => {
    props.setCategory(args.value) as any;
  };

  return (
    // specifies the tag for render the DropDownList component
    <DropDownListComponent
      id="ddlelement"
      value={props.editData&& props.editData.category_type}
      change={handleChange}
      dataSource={data}
      placeholder="Select category"
      showClearButton
      style={{marginRight: "5px"}}
    />
  );
};

export default Dropdown;
