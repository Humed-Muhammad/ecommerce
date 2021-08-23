import { useState } from "react";
import { useSelector } from "react-redux";
import HomeCard from "./HomeCard.jsx";
import { Link } from "react-router-dom";

const AllCard = ({ setPath }) => {
  const { allMajorCategory, allSubCategory } = useSelector(
    (state) => state.products
  );
  let [major, setMajor] = useState([]);

  return (
    <div className="w-full flex justify-center items-center flex-col mt-10 bg-gray-100">
      <h1 className=" text-2xl text-gray-600 mb-5">All Categories</h1>
      <div className="w-full flex flex-wrap justify-center items-center ">
        {allMajorCategory.map((item) => (
          <Link
            onClick={() => {
              setPath(item.major_category);
              localStorage.setItem("path", item.major_category);
            }}
            key={item.id}
            to={`products/${item.major_category}`}
          >
            <HomeCard item={item} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllCard;
