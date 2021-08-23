import React, { useState, useEffect } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { getApi } from "../../../api/admin";

const SubDropdown = (props:any) => {
  let [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let { message } = await getApi("get-all-category");
      let array:any = [];


      message[1].map((item:any) => {
        if(props?.catId === item.majorId){
          array.push(item.sub_name);
        }
        console.log(item.majorId);
      });

      setData(await array);
    };
    fetchData();
  }, [props?.catId]);


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
