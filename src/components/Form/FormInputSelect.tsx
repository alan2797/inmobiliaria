import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    //minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const FormSelect = (props) => {
  const classNameDefault = useStyles();
  const {
    label,
    helperText,
    name,
    onChange,
    value,
    type,
    className,
    error,
    shrink = null,
    select = false,
    opciones = [],
  } = props.input;

  return (
    <div>
      <TextField
        label={label}
        select
        value={value}
        onChange={onChange}
        name={name}
        error={error}
        fullWidth
      >
        {opciones.map((data, index) => (
          <MenuItem value={data.id}>{data.nombre}</MenuItem>
        ))}
      </TextField>
    </div>
  );
};
export default FormSelect;
