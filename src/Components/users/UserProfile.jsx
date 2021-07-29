import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import gif from "./gif/blackforest.gif";
import { UserCircleIcon } from "@heroicons/react/outline";
import { passUser, changeProfile, postApi } from "../../api";
import { getLoggedInUser } from "../../redux/slice/users";

const UserProfile = () => {
  let [preview, setPreview] = useState();
  let [open, setOpen] = useState(false);

  const imageRef = useRef();
  let [tokenData, setTokenData] = useState({
    id: "",
    email: "",
    name: "",
  });

  let { loggedInUser } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  console.log(loggedInUser);

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
  }, [preview, open]);
  console.log(tokenData);

  const handleChange = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
    setOpen(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = await postApi("change-profile", {
      image: preview,
      id: loggedInUser[0].id,
    });
    console.log(data);
    setOpen(false);
  };

  return (
    <div className="h-screen bg-gray-100 w-screen flex justify-center items-center ">
      <div className="bg-white shadow-lg w-full pr-2 sm:w-4/5 h-2/5 flex justify-between items-center lg:w-3/5">
        {open && (
          <div className="w-full sm:w-4/5 h-2/5 h-96 z-10 absolute flex justify-center items-center lg:w-3/5">
            <form
              className="shadow-lg bg-white bg-opacity-80 w-full h-full flex justify-around items-center"
              onSubmit={(e) => handleSubmit(e)}
            >
              <img className="object-cover w-1/2 h-full" src={preview} alt="" />

              <div className="w-full flex-1 flex justify-around items-center">
                <button
                  className="text-indigo-500 w-24 rounded border border-indigo-600"
                  onClick={() => setOpen(false)}
                >
                  Cancle
                </button>
                <button
                  className="text-indigo-500 w-24 border rounded border-indigo-600"
                  type="submit"
                >
                  Ok
                </button>
              </div>
            </form>
          </div>
        )}
        {loggedInUser[0].image ? (
          <img
            className="object-cover h-full w-1/2 cursor-pointer"
            src={loggedInUser[0].image}
            alt=""
          />
        ) : (
          <img
            className="object-cover h-full w-1/2 cursor-pointer"
            src={gif}
            alt=""
          />
        )}

        <div className="absolute  h-2/5 w-full sm:w-4/5 flex justify-center items-center lg:w-3/5">
          <UserCircleIcon
            onClick={() => imageRef.current.click()}
            className="text-white font-normal rounded-full w-12 h-12 bg-gray-700 py-1 px-2 cursor-pointer"
          />
          <input
            onChange={(e) => handleChange(e)}
            ref={imageRef}
            type="file"
            name="file"
            hidden
            id=""
            accept="image/*"
          />
        </div>

        <div className="flex flex-col h-full justify-around items-base flex-1 ml-4">
          <div className="flex-1 flex flex justify-center items-base">
            <div className="flex flex-1 justify-center items-base flex-col">
              <label className="text-gray-400"> Name </label>
              <h1 className="text-gray-700 font-bold">
                {loggedInUser[0].name}
              </h1>
            </div>
            <div className="flex-1 flex flex-col justify-center items-base">
              <label className="text-gray-400"> Email </label>
              <h1 className="text-gray-700 font-bold">
                {loggedInUser[0].email}
              </h1>
            </div>
          </div>
          <div className="flex-1 flex flex justify-center items-base">
            <div className="flex flex-1 justify-center items-base flex-col">
              <label className="text-gray-400"> Type </label>
              <h1 className="text-gray-700 font-bold">User</h1>
            </div>
            <div className="flex-1 flex flex-col justify-center items-base">
              <label className="text-gray-400"> Total Cart Item </label>
              <h1 className="text-gray-700 font-bold">
                {loggedInUser[0].cartNum}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
