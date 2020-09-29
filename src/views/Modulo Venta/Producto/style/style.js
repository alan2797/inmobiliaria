import { makeStyles } from "@material-ui/styles";

import { red } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  button: {
    marginRight: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  rootCard: {
    maxWidth: 150,
    width: 140,
  },
}));
export { useStyles };
