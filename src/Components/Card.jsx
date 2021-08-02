import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { CheckCircleIcon } from "@heroicons/react/outline";
import Typography from "@material-ui/core/Typography";
import { useSelector, useDispatch } from "react-redux";
import { addCartItems, increment } from "../redux/slice/Cart";
import Popup from "./Popup.jsx";
import { postApi } from "../api";

const useStyles = makeStyles({
  root: {
    width: 250,
    margin: 10,
  },
  media: {
    height: 210,
    backgroundPosition: "top",
  },
  desc: {
    margin: 2,
  },
});

export default function MediaCard({ item }) {
  let [added, setAdded] = useState(false);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  let { cartItems } = useSelector((state) => state.cartBucket);

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  const dispatch = useDispatch();

  const loggedInStatus = localStorage.getItem("logged_in");

  const handleAddingToCart = async (e) => {
    e.preventDefault();
    if (loggedInStatus) {
      let { status, message } = await postApi("add-cart", await cartItems[0]);
      dispatch(increment(message));
    }
  };

  return (
    <Card className="w-60 mr-5 mt-24 md:mt-3">
      <form onSubmit={(e) => handleAddingToCart(e)}>
        <Popup
          handleClose={handleClose}
          handleClickOpen={handleClickOpen}
          open={open}
          setOpen={setOpen}
        />
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={item.image}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {item.title}
            </Typography>
            <Typography
              className="text-center w-full"
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {item.short_desc}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className="flex justify-around items-center ">
          <div className="text-md">${item.price}</div>
          {item.quantity == 0 ? (
            <button className="bg-gray-700 text-white py-1 px-2 rounded-sm">
              Sold out
            </button>
          ) : (
            <div className="">
              {loggedInStatus && added && (
                <button className="text-green-500 flex justify-center items-center">
                  Added <CheckCircleIcon className="text-green h-7" />{" "}
                </button>
              )}

              {loggedInStatus && (
                <button
                  type="submit"
                  onClick={() => {
                    if (loggedInStatus) {
                      dispatch(
                        addCartItems({
                          title: item.title,
                          category_type: item.category_type,
                          category_id: item.category_id,
                          subcategory_type: item.subcategory_type,
                          image: item.image,
                          color: item.color,
                          website: item.website,
                          price: item.price,
                          productId: item.id,
                          userId: localStorage.getItem("userId"),
                          short_desc: item.short_desc,
                          quantity: 1,
                          size: item.size,
                        })
                      );

                      setAdded(true);
                    }
                    if (!loggedInStatus) {
                      setOpen(true);
                    }
                  }}
                  className="bg-yellow-500 text-white py-2 px-3 rounded-sm"
                >
                  Add To Cart
                </button>
              )}
            </div>
          )}
        </CardActions>
      </form>
    </Card>
  );
}
