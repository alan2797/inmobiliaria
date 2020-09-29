import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { Add } from "@material-ui/icons";
import Tooltip from "@material-ui/core/Tooltip";

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

export default function CardView() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Card className={classes.root}>
      <CardHeader title="Pan Casero" subheader="Normal" />
      <CardMedia
        className={classes.media}
        image="https://www.bakels.com.ec/wp-content/uploads/sites/32/2020/09/Bakels-panilisto-pan-casero.jpg"
        title="Paella dish"
      />
      <CardActions disableSpacing>
        <Typography variant="overline">Precio: 2 Bs</Typography>

        <Tooltip title="Agregar Insumo" aria-label="add">
          <IconButton aria-label="agregar" className={classes.leftIcon}>
            <Add style={{ color: "green" }} />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
