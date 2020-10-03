import { makeStyles } from "@material-ui/styles";

import { red } from "@material-ui/core/colors";
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  button: {
    marginRight: theme.spacing(1),
  },
}));
export { useStyles };
