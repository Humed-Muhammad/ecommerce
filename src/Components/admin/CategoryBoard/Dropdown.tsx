import React, { useState, useEffect } from "react";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";
import { getApi } from "../../../api/admin";

const Dropdown = (props:any) => {
  let [data, setData] = useState([]);
  let [major, setMajor] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let { message } = await getApi("get-all-category");
      let array:any = [];

      console.log(message);

      setMajor(message[0])

      message[0].map((item:any) => {
        array.push(item.major_category);
      });

      setData(await array);
    };
    fetchData();
  }, []);


  let handleChange = (args: any) => {
    props.setCategory(args.value) as any;
    
    major.forEach(item => {
      if(item?.major_category == args.value) {
        props.setCatId(item?.id)
        }
    });

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
