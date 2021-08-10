import { useEffect, useState } from "react";
import Dropdown from "./Dropdown.jsx";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { SearchIcon } from "@heroicons/react/outline";
import { Avatar } from "@material-ui/core";
import { postApi } from "../api";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import { getLoggedInUser } from "../redux/slice/users";

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

const Navbar = () => {
  let [tokenData, setTokenData] = useState({
    id: "",
    email: "",
    name: "",
  });

  let { cartCount } = useSelector((state) => state.cartBucket);
  let { loggedInUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  let loggedInStatus = localStorage.getItem("logged_in");

  useEffect(() => {
    let fetchData = async () => {
      let userEmail = localStorage.getItem("userEmail");

      if (loggedInStatus) {
        let { message } = await postApi("pass_user", userEmail);
        let {
          data: { id, email, name, image, cartNum },
        } = jwtDecode(message.token);

        setTokenData({ id, email, name, image, cartNum });
        dispatch(getLoggedInUser({ id, email, name, image, cartNum }));
      }
    };
    fetchData();
  }, [cartCount, loggedInStatus]);

  return (
    <nav className="w-screen z-10 h-40 bg-white flex flex-wrap justify-around items-center shadow-lg fixed top-0 md:h-24">
      <Link
        to="/"
        className="text-gray-700 text-2xl border-b-2 font-bold border-blue-500"
      >
        Shophub
      </Link>
      <form className="flex justify-center items-center w-full sm:w-3/5">
        <Dropdown />
        <input
          placeholder="Enter Keywords"
          className="h-10 px-2 text-gray-700 border border-gray-300 outline-none w-full sm:w-3/5"
          type="text"
          name=""
          id=""
        />
        <SearchIcon className="text-white h-8 bg-gray-800 h-10 w-1/5 py-2 mr-3 rounded-r cursor-pointer" />
      </form>

      <div className="divide-x divide-gray-400 flex items-center justify-around">
        {loggedInStatus ? (
          <div className="flex justify-center items-center cursor-pointer">
            <p className="text-xl text-gray-700 py-2 px-2">{tokenData.name}</p>
            <Link to="/profile">
              <Avatar
                className="mr-2"
                alt={tokenData.name}
                src={loggedInUser[0] && loggedInUser[0].image}
              />
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem("logged_in");
                localStorage.removeItem("userEmail");
                localStorage.removeItem("userId");
                window.location.reload();
              }}
              className="py-2 px-2 bg-red-500 text-white rounded-sm mr-2"
            >
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link
              to="/login"
              className="text-gray-700 px-2 py-2 hover:bg-gray-800 hover:text-white  transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-gray-700 px-2 py-2 hover:bg-gray-800 hover:text-white transition"
            >
              Register
            </Link>
          </div>
        )}
        {loggedInStatus && (
          <Link to="/cart" className="flex items-center justify-around px-3">
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={cartCount} color="secondary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
