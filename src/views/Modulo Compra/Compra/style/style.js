import { makeStyles } from "@material-ui/styles";

import { red, green } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  button: {
    marginRight: theme.spacing(1),
  },
  cardDetalleMargin: {
    marginTop: theme.spacing(2),
  },
  sizeGrid: {
    minHeight: "500px",
    maxHeight: "500px",
    overflowY: "scroll",

    // padding: theme.spacing(1),
  },
  greenAvatar: {
    color: "#fff",
    backgroundColor: green[500],
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  cajaPadre: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  fotoPadre: {
    height: 60,
    width: 60,
    marginRight: theme.spacing(2),
    backgroundColor: "#f2f2f2",
  },
  lista: {
    marginBottom: theme.spacing(2),
  },
}));
export { useStyles };
