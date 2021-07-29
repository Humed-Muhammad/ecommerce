import SideBar from "./SideBar.jsx";
import MainDashboard from "./MainDashboard.jsx";
import CategoryBaord from "./CategoryBoard/CategoryBoard.jsx";
import Products from "./Products/Products.jsx";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Transaction from "./Transaction.jsx";

const AdminDashboard = () => {
  return (
    <div className="h-screen w-screen bg-gray-100 flex justify-center items-center">
      <Router>
        <SideBar />
        <Route exact path="/">
          <MainDashboard />
        </Route>
        <Route path="/transaction">
          <Transaction />
        </Route>
        <Route path="/category">
          <CategoryBaord />
        </Route>
        <Route path="/products">
          <Products />
        </Route>
      </Router>
    </div>
  );
};

export default AdminDashboard;
