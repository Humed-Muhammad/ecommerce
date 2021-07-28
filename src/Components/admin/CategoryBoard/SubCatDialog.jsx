import React, { useState, useEffect } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { major_categories } from "../../../api";

const SubDropdown = ({ catId }) => {
  let [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let { status, message } = await major_categories();
      let array = [];

      let id = 1;
      message[0].map((item) => {
        if (item.major_category == catId) {
          id = item.id;
        }
      });

      message[1].map((item) => {
        if ((item.majorId = id)) {
          array.push(item.sub_name);
        }
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

export default SubDropdown;
