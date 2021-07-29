import React, { useState, useEffect } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { getApi } from "../../../api/admin";

const SubDropdown = (props:any) => {
  let [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let { status, message } = await getApi("get-all-category");
      let array:any = [];

      console.log(message);

      message[1].map((item:any) => {
        array.push(item.sub_name);
      });

      setData(await array);
    };
    fetchData();
  }, []);
  console.log(data);

  let handleChange = (args: any) => {
    props.setSubCategoryType(args.value);
  };

  return (
    // specifies the tag for render the DropDownList component
    <DropDownListComponent
    value={props.editData&& props.editData.subcategory_type}
      id="ddlelement"
      change={handleChange}
      dataSource={data}
      placeholder="Select category"
      showClearButton
    />
  );
};

export default SubDropdown;
