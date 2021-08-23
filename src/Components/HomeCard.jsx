import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";

import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Typography from "@material-ui/core/Typography";

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
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={item.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="body2" component="h2">
            {item.major_category}
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
    </Card>
  );
}
