import React, { useState, useEffect } from "react";
import EditPage from "./EditPage.jsx";
import {
  ColumnDirective,
  ColumnsDirective,
  Column,
  Filter,
  GridComponent,
  Grid,
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
  CommandClickEventArgs,
  PageEventArgs,
  QueryCellInfoEventArgs,
} from "@syncfusion/ej2-react-grids";
import { getValue } from "@syncfusion/ej2-base";
import { postApi } from "../../../api/admin";
import TopBar from "../TopBar.jsx";
import AddDialog from "./AddDialog.jsx";

const Products = ({ dataSrc, value, orders }) => {
  let [open, setOpen] = useState(false);
  let [editing, setEditing] = useState(false);
  let [editData, setEditData] = useState({});
  let [ordersStatus, setOrdersStatus] = useState([]);

  let array = [];

  dataSrc &&
    dataSrc.map((item) => {
      array.push(item.status);
    });

  console.log(array);

  const filterOptions: FilterSettingsModel = {
    type: "Excel",
  };

  let commandClick = async (args: CommandClickEventArgs) => {
    const target = args.target;
    if (target.classList.contains("e-approve")) {
      await postApi("change-order-status", {
        orderId: args.rowData.orderId,
        status: 2,
      });
      target.innerHTML = "Approved";
    } else if (target.classList.contains("e-reject")) {
      await postApi("change-order-status", {
        orderId: args.rowData.orderId,
        status: 0,
      });
      target.innerHTML = "Rejected";
    }
  };

  let customizeCell = (args: QueryCellInfoEventArgs) => {
    if (args.column.field === "status" && args.data && args.cell) {
      if (getValue("status", args.data) == 0) {
        args.cell.innerHTML = "Rejected";
        args.cell.classList.add("bg-red-400");
      } else if (getValue("status", args.data) == 1) {
        args.cell.innerHTML = "Pending";
        args.cell.classList.add("bg-blue-400");
      } else if (getValue("status", args.data) == 2) {
        args.cell.innerHTML = "Approved";
        args.cell.classList.add("bg-green-400");
      }
    }
  };

  console.log(value);

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

  let labelCommand: CommandModel = [
    {
      buttonOption: {
        content: "Approve",
        iconCss: "",
        cssClass: "e-flat e-approve",
      },
    },
    {
      buttonOption: {
        content: "Reject",
        iconCss: "",
        cssClass: "e-flat e-reject",
      },
    },
  ];

  const toolBarOptions: ToolbarItems[] = ["Search", "Delete", "Cancel"];

  const editOptions: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    showDeleteConfirmDialog: true,
  };

  return (
    <div className="w-full h-full flex flex-col justify-between items-center">
      <TopBar name={orders} />
      {editing ? (
        <EditPage
          setOpen={setOpen}
          open={open}
          setEditing={setEditing}
          editData={editData}
        />
      ) : (
        <div className="flex flex-col flex-1 justify-base items-base h-full mt-20 mx-3">
          {!value && (
            <div className="z-10 w-full flex justify-around items-center mb-5 md:justify-between">
              <h1 className="text-lg text-gray-500">Products</h1>
              <button
                onClick={() => setOpen(true)}
                className="bg-gray-700 py-1 px-2 text-sm text-white rounded"
              >
                Add New Product
              </button>
            </div>
          )}
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
              enableHover={false}
              editSettings={editOptions}
              allowResizing={true}
              commandClick={commandClick}
              queryCellInfo={customizeCell}
              actionBegin={async (args: PageEventArgs) => {
                console.log(args);
                if (args.requestType == "delete") {
                  postApi("delete-product", args.data[0].id);
                }
              }}
              beginEdit={async (args: pageEventArgs) => {
                if (args.requestType == "beginEdit") {
                  setEditData(await args.rowData);
                  setEditing(true);
                  setOpen(true);
                }
              }}
            >
              <ColumnsDirective>
                <ColumnDirective type="checkbox" width="20" />
                <ColumnDirective
                  field="id"
                  headerText="Id"
                  isPrimaryKey={true}
                  width="100"
                  visible={false}
                />
                <ColumnDirective
                  field="category_id"
                  headerText="Category Id"
                  width="70"
                  visible={false}
                />
                <ColumnDirective
                  field="category_type"
                  headerText="Category Type"
                  width="100"
                />
                <ColumnDirective field="title" headerText="Name" width="60" />
                <ColumnDirective field="color" headerText="Color" width="60" />
                <ColumnDirective
                  field="quantity"
                  headerText="Quantity"
                  width="50"
                  format="C2"
                />
                <ColumnDirective
                  field="created_at"
                  headerText="Created date"
                  width="100"
                  visible={false}
                />
                <ColumnDirective field="price" headerText="Price" width="50" />
                <ColumnDirective field="size" headerText="Size" width="50" />
                <ColumnDirective
                  field="subcategory_type"
                  headerText="Subcategory"
                  width="100"
                />
                <ColumnDirective
                  field="short_desc"
                  headerText="Short Desc"
                  width="100"
                />
                <ColumnDirective
                  field="description"
                  headerText="Description"
                  width="100"
                  visible={false}
                />

                <ColumnDirective
                  field="status"
                  headerText="Status"
                  width="50"
                  textAlign="center"
                  allowSelection={false}
                  visible={value}
                />

                <ColumnDirective
                  headerText="Commands"
                  width="100"
                  autoFit={true}
                  textAlign="Center"
                  commands={value ? labelCommand : commands}
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

// import { closest } from '@syncfusion/ej2-base';
// import { ColumnDirective, ColumnsDirective, CommandColumn, Grid, GridComponent } from '@syncfusion/ej2-react-grids';
// import { Column, CommandModel, CommandClickEventArgs, Edit, EditSettingsModel, Inject, IRow } from '@syncfusion/ej2-react-grids';
// import * as React from 'react';
// import { data } from './datasource';

// export default class App extends React.Component<{}, {}> {
//   public editOptions: EditSettingsModel = { allowEditing: true, allowDeleting: true };
//   public commands: CommandModel[] = [
// {
//   buttonOption: {
//     content: 'Details', cssClass: 'e-flat'
//   }
// }
//   ];
//   public grid: Grid | null;

//   public commandClick(args: CommandClickEventArgs): void  {
// if (this.grid) {
//   alert(JSON.stringify(args.rowData));
// }
//   }

//   public render() {
//   this.commandClick = this.commandClick.bind(this);
// return <GridComponent dataSource={data} editSettings={this.editOptions} commandClick={this.commandClick} height={265} ref={g => this.grid = g}>
//   <ColumnsDirective>
//       <ColumnDirective field='OrderID' headerText='Order ID' width='100' textAlign="Right" isPrimaryKey={true}/>
//       <ColumnDirective field='CustomerID' headerText='Customer ID' width='120'/>
//       <ColumnDirective field='Freight' headerText='Freight' width='120' format="C2" editType= 'numericedit' textAlign="Right"/>
//       <ColumnDirective field='ShipCountry' headerText='Ship Country' editType= 'dropdownedit' width='150'/>
//       <ColumnDirective headerText='Commands' width='120' commands= {this.commands}/>
//   </ColumnsDirective>
//   <Inject services={[Edit, CommandColumn]} />
// </GridComponent>
//   }
// };
