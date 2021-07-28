import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import { CheckCircleIcon } from "@heroicons/react/outline";
import Typography from "@material-ui/core/Typography";
import CartQuantityHandler from "../CartQuantityHandler";
import { useSelector } from "react-redux";

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
  let [amount, setAmount] = useState("");
  let { allCartItems, cartCount } = useSelector((state) => state.cartBucket);

  useEffect(() => {
    console.log(allCartItems);
  }, [amount, cartCount]);
  const classes = useStyles();
  return (
    <Card className="w-60 mr-5 mt-24 md:mt-3">
      <form>
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
        </CardActions>
      </form>
    </Card>
  );
}
