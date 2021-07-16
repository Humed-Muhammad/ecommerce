import React, { useState, useEffect } from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  Search,
  Sort,
  FilterSettingsModel,
  Toolbar,
  ToolbarItems,
  Edit,
  EditSettingsModel,
} from "@syncfusion/ej2-react-grids";
import { DataManager } from '@syncfusion/ej2-data'
import { getAllProducts } from "../../../api";
import TopBar from "../TopBar.jsx";

const Products = () => {
  let [response, setResponse] = useState({ status: "", message: "" });
  useEffect(() => {
    let fetchData = async () => {
      let { status, message } = await getAllProducts();
      setResponse({ status, message });
      console.log(message);
    };
    fetchData();
  }, []);

  const filterOptions: FilterSettingsModel = {
    type: "Excel",
  };

  const toolBarOptions:ToolbarItems[] = ['Search', "Add", "Edit", "Delete", "Update", "Cancel"]

  const editOptions: EditSettingsModel = { allowEditing: true, allowAdding: true, allowDeleting: true };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <TopBar name='Products' />
      <div className="flex-1 flex justify-center items-base h-full mt-20 ml-5">
        <GridComponent
          dataSource={response.message}
          allowPaging={true}
          pageSettings={{ pageSize: 6 }}
          allowSorting={true}
          allowFiltering={true}
          allowGrouping={true}
          allowSelection={true}
          filterSettings={filterOptions}
          style={{ color: "blue" }}
          toolbar={toolBarOptions}
          editSettings={editOptions}
          
        >
          <ColumnsDirective>
            <ColumnDirective type="checkbox" width="50" isPrimaryKey={true} />
            <ColumnDirective
              field="id"
              headerText="Id"
              width="100"
            />
            <ColumnDirective
              field="category_id"
              headerText="Category Id"
              width="100"
            />
            <ColumnDirective
              field="category_type"
              headerText="Category Type"
              width="100"
            />
            <ColumnDirective field="title" headerText="Name" width="100" />
            <ColumnDirective
              field="color"
              headerText="Color"
              width="100"
            />
            <ColumnDirective
              field="quantity"
              headerText="Quantity"
              width="100"
              format="C2"
            />
            <ColumnDirective
              field="created_at"
              headerText="Created date"
              width="100"
            />
            <ColumnDirective field="price" headerText="Price" width="100" />
            <ColumnDirective field="size" headerText="Size" width="100" />
            <ColumnDirective
              field="subcategory_id"
              headerText="Subcategory"
              width="100"
            />
          </ColumnsDirective>
          <Inject services={[Page, Sort, Group, Search, Filter, Toolbar, Edit]} />
        </GridComponent>
      </div>
    </div>
  );
};

export default Products;
