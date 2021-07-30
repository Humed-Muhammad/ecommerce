import { useEffect, useState } from "react";
import SideBar from "./SideBar.jsx";
import MainDashboard from "./MainDashboard.jsx";
import CategoryBaord from "./CategoryBoard/CategoryBoard.jsx";
import Products from "./Products/Products.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Transaction from "./Transaction/Transaction.jsx";
import { getApi } from "../../api/admin";

const AdminDashboard = () => {
  let [dataSrc, setDataSrc] = useState();
  useEffect(() => {
    let fetchData = async () => {
      let data = await getApi("get-all-products");
      setDataSrc(data);
      console.log(data);
    };
    fetchData();
  }, []);
  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <Router>
        <SideBar />
        <Route exact path="/">
          <MainDashboard />
        </Route>
        <Route path="/products">
          <Products order={"Products"} value={false} dataSrc={dataSrc} />
        </Route>
        <Route path="/transaction">
          <Transaction dataSrc={dataSrc} />
        </Route>
        <Route path="/category">
          <CategoryBaord />
        </Route>
      </Router>
    </div>
  );
};

export default AdminDashboard;
