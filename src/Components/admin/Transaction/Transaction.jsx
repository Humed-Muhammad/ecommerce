import { useEffect, useState } from "react";
import { getApi, postApi } from "../../../api/admin";
import Products from "../Products/Products.jsx";
const Transaction = () => {
  let [dataSrc, setDataSrc] = useState("");
  useEffect(() => {
    let fetchData = async () => {
      let { message } = await getApi("get-all-order");
      setDataSrc(message);
      console.log(message);
    };
    fetchData();
  }, []);

  return (
    <div className="w-full h-full">
      <Products orders={"User Orders"} dataSrc={dataSrc} value={true} />
    </div>
  );
};

export default Transaction;
