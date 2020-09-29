import React from "react";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { Can } from "components/Can";
const useStyles = makeStyles((theme) => ({
  textField: {
    marginBottom: theme.spacing(2),
  },
}));
const FormInput = (props) => {
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
    readOnly = false,
    opciones = [],
    id,
  } = props;

  return (
    <Can id={id}>
      <TextField
        className={[className, classNameDefault.textField].join(" ")}
        error={error}
        fullWidth
        select={select}
        helperText={helperText}
        label={label}
        name={name}
        onChange={onChange}
        type={type}
        value={type === "file" ? undefined : value || ""}
        //variant="outlined"
        margin="normal"
        InputLabelProps={shrink && { shrink: true }}
        InputProps={{
          readOnly: !!readOnly,
        }}
      >
        {opciones.map((data, index) => (
          <MenuItem value={data.id}>{data.nombre}</MenuItem>
        ))}
        {props.children}
      </TextField>
    </Can>
  );
};
export { FormInput };
