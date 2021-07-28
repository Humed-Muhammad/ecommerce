import React, { useState, useEffect } from "react";
import EditPage from "./EditPage.jsx";
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
  CommandModel,
  CommandColumn,
  PageEventArgs,
} from "@syncfusion/ej2-react-grids";

import { getAllProducts, deleteProducts } from "../../../api";
import TopBar from "../TopBar.jsx";
import AddDialog from "./AddDialog.jsx";

const Products = () => {
  let [open, setOpen] = useState(false);
  let [editing, setEditing] = useState(false);
  let [dataSrc, setDataSrc] = useState([]);
  let [editData, setEditData] = useState({});

  useEffect(() => {
    let fetchData = async () => {
      let data = await getAllProducts();
      setDataSrc(data);
      console.log(data);
    };
    fetchData();
  }, []);

  const filterOptions: FilterSettingsModel = {
    type: "Excel",
  };

  let commands: CommandModel = [
    {
      type: "Edit",
      buttonOption: { cssClass: "e-flat", iconCss: "e-edit e-icons" },
    },
    {
      type: "Delete",
      buttonOption: { cssClass: "e-flat", iconCss: "e-delete e-icons" },
    },
    {
      type: "Save",
      buttonOption: { cssClass: "e-flat", iconCss: "e-update e-icons" },
    },
    {
      type: "Cancel",
      buttonOption: { cssClass: "e-flat", iconCss: "e-cancel-icon e-icons" },
    },
  ];

  const toolBarOptions: ToolbarItems[] = ["Search", "Delete", "Cancel"];

  const editOptions: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <TopBar name="Products" />
      {editing ? (
        <EditPage
          setOpen={setOpen}
          open={open}
          setEditing={setEditing}
          editData={editData}
        />
      ) : (
        <div className="flex flex-col flex-1 justify-base items-base h-full mt-20 mx-3">
          <div className="z-10 w-full flex justify-around items-center mb-5 md:justify-between">
            <h1 className="text-lg text-gray-500">Products</h1>
            <button
              onClick={() => setOpen(true)}
              className="bg-gray-700 py-1 px-2 text-sm text-white rounded"
            >
              Add New Product
            </button>
          </div>
          <AddDialog setOpen={setOpen} open={open} />
          <div className="">
            <GridComponent
              dataSource={dataSrc}
              allowPaging={true}
              pageSettings={{ pageSize: 6 }}
              allowSorting={true}
              allowFiltering={true}
              allowGrouping={true}
              allowSelection={true}
              filterSettings={filterOptions}
              toolbar={toolBarOptions}
              editSettings={editOptions}
              allowResizing={true}
              actionBegin={async (args: PageEventArgs) => {
                if (args.requestType == "delete") {
                  deleteProducts(args.data[0].id);
                }
              }}
              beginEdit={async (args: pageEventArgs) => {
                if (args.requestType == "beginEdit") {
                  setEditData(await args.rowData);
                  setEditing(true);
                  setOpen(true);
                  console.log(args.rowData);
                }
              }}
            >
              <ColumnsDirective>
                <ColumnDirective type="checkbox" width="50" />
                <ColumnDirective
                  field="id"
                  headerText="Id"
                  isPrimaryKey={true}
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
                <ColumnDirective field="color" headerText="Color" width="100" />
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
                <ColumnDirective
                  field="short_desc"
                  headerText="Subcategory"
                  width="100"
                />
                <ColumnDirective
                  field="description"
                  headerText="Subcategory"
                  width="100"
                />

                <ColumnDirective
                  headerText="Commands"
                  width="100"
                  commands={commands}
                />
              </ColumnsDirective>
              <Inject
                services={[
                  Page,
                  Sort,
                  Group,
                  Search,
                  Filter,
                  Toolbar,
                  Edit,
                  CommandColumn,
                ]}
              />
            </GridComponent>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
