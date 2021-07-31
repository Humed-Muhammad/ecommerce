import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";
import {
  DateRangePickerComponent,
  Data,
} from "@syncfusion/ej2-react-calendars";
import { getApi, postApi } from "../../api/admin";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
  PieSeries,
  Inject,
  AccumulationDataLabel,
  AccumulationLegend,
  AccumulationTooltip,
} from "@syncfusion/ej2-react-charts";
import { motion } from "framer-motion";

const parent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 1,
      delayChildren: 0.3,
    },
  },
};
const child = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
    },
  },
};

const MainDashboard = () => {
  let start = new Date();
  start.setMonth(new Date().getMonth() - 1);
  let [response, setResponse] = useState([]);
  let [orderNums, setOrderNums] = useState([]);
  let [endDate, setEndDate] = useState(new Date());
  let [startDate, setStartDate] = useState(start);

  let majorCategory = [];
  // const endDate = new Date();
  // const startDate = new Date();

  useEffect(() => {
    const fetchData = async () => {
      let { message } = await postApi("get-product-price", {
        startDate: startDate,
        endDate: endDate,
      });
      setResponse(message);
      getCategoryId(message);
    };
    fetchData();
  }, [startDate, endDate]);

  async function getCategoryId(useData) {
    if (useData) {
      useData.map((item) => {
        majorCategory.push(item.category_id);
      });

      let { message } = await postApi("get-order-by-type", majorCategory);
      setOrderNums(message);
    }
  }

  console.log(response);

  let getDataRange = (props) => {
    setStartDate(props.startDate);
    setEndDate(props.endDate);
  };

  return (
    <div className="h-full border-r border-gray-300 flex-1 flex flex-col justify-between items-center ">
      <TopBar name={"Dashboard"} />
      <div className="flex-1 w-full justify-base items-center">
        <div className="w-full h-24 flex justify-between items-center">
          <h1 className="text-xl text-gray-500 ml-5">Dashboard</h1>
          <div className="mr-5">
            <DateRangePickerComponent
              startDate={startDate}
              endDate={endDate}
              placeholder="Select a range"
              id="daterangepicker"
              change={getDataRange}
            />
          </div>
        </div>
        <React.Fragment>
          <motion.div
            variants={parent}
            initial="hidden"
            animate="visible"
            className="w-full flex-1 flex flex-wrap justify-around items-center"
          >
            {response &&
              response.map((item, id) => (
                <motion.div
                  variants={child}
                  key={id}
                  className="bg-white m-2 shadow-lg h-24 flex-1 flex flex-col justify-around items-center rounded "
                >
                  <div className="w-full flex-1 flex flex justify-around items-center divide-x divide-yellow-600">
                    <div className="flex-1 flex justify-center items-center">
                      Orders (
                      <span className="text-green-700 mx-1">
                        {orderNums[id]}
                      </span>
                      )
                    </div>
                    <div className="flex-1 flex flex-col justify-center items-center">
                      <h1 className="text-lg text-yellow-500">
                        <span className="texts-sm">Sells</span>(
                        <span className="text-lg mx-1 text-gray-700">
                          ${item.price}
                        </span>
                        )
                      </h1>
                    </div>
                  </div>
                  <h1 className="text-sm text-gray-500 mb-1">
                    {item.major_category}
                  </h1>
                </motion.div>
              ))}
          </motion.div>
        </React.Fragment>
        <div className="m-5">
          <AccumulationChartComponent
            id="charts"
            title="Product Sells"
            tooltip={{ enable: true }}
          >
            <Inject
              services={[
                PieSeries,
                AccumulationDataLabel,
                AccumulationLegend,
                AccumulationTooltip,
              ]}
            />
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective
                type="Pie"
                dataSource={response}
                xName="major_category"
                innerRadius="50%"
                yName="price"
                dataLabel={{
                  visible: true,
                  name: "major_category",
                  position: "Outside",
                }}
              ></AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
