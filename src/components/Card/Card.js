import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Add, Check } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 0,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    marginLeft: 8,
    marginRight: 8,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  leftIcon: {
    marginLeft: "auto",
  },
}));

export const CardView = (props) => {
  const classes = useStyles();
  const { data } = props;
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {data.caracteristica.nombre.substring(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="agregar" className={classes.leftIcon}>
            <Check style={{ color: "blue" }} />
          </IconButton>
        }
        title={<h3>{data.caracteristica.nombre}</h3>}
        subheader={data.descripcion}
      />
    </Card>
  );
};
