import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { SAVE, BACK } from "constants/index";
import { FormInput } from "components";
import useForm from "hooks/useForm.js";
import { RequestServer } from "service/RequestServer";
import MessageContext from "context/messageContext";
import { formSchema, formSchemaUsuario } from "./formSchema";
import {
  schema as schemaValidate,
  schemaUsuario as schemaUsuarioValidate,
} from "./Schema.js";
import { useStyles } from "../../style/style";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";
import { Button } from "components/Buttom";

const PersonalCreate = (props) => {
  const { history } = props;
  const className = useStyles();
  const [formState, handleChange, hasError] = useForm(schemaValidate);
  const [formStateUsuario, handleChangeUsuario, hasErrorUsuario] = useForm(
    schemaUsuarioValidate
  );
  const { showSnack } = useContext(MessageContext);
  const [expanded, setExpanded] = React.useState(false);
  const [rol, setRol] = React.useState([]);

  const getRol = async () => {
    try {
      const result = await RequestServer.GET("http://localhost:5000/api/rol");
      console.log(result.data);
      var array = [];
      for (let i = 0; i < result.data.data.length; i++) {
        let item = result.data.data[i];
        let data = {
          id: item.id,
          nombre: item.nombre,
        };
        array.push(data);
      }
      formSchemaUsuario.rolId.opciones = array;
      setRol(array);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  useEffect(() => {
    getRol();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const body = {
      personal: formState.values,
      acceso_sistema: expanded,
      usuario: formStateUsuario.values,
    };
    console.log(body);
    try {
      const rsp = await RequestServer.POST(
        "http://localhost:5000/api/personal/create",
        body
      );
      showSnack(rsp.data.message, "success");
      history.goBack();
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };
  ///collapse
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className={className.root}>
      <Card className={className.root}>
        <CardHeader title="Registro de Personal" />
        <Divider />
        <CardContent>
          <Grid container direction="row" spacing={4}>
            {Object.keys(formSchema).map((key) => (
              <Grid item md={6}>
                <FormInput
                  id={formSchema[key].id}
                  key={key}
                  name={key}
                  label={formSchema[key].label}
                  value={formState.values[key]}
                  helperText={
                    hasError(key)
                      ? formState.errors[key][0]
                      : formSchema[key].helperText
                  }
                  error={hasError(key)}
                  onChange={handleChange}
                  type={formSchema[key].type}
                  shrink={formSchema[key].shrink}
                  opciones={formSchema[key].opciones}
                  select={formSchema[key].select}
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Card style={{ marginTop: 10, marginBottom: 10 }}>
        <CardContent>
          <FormControlLabel
            control={
              <Switch
                checked={expanded}
                onChange={handleExpandClick}
                name="checkedA"
              />
            }
            label="Tendra acceso al sistema"
          />
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Divider />
            <CardContent>
              <Typography paragraph>Datos de Usuario:</Typography>
              {Object.keys(formSchemaUsuario).map((key) => (
                <FormInput
                  key={key}
                  name={key}
                  label={formSchemaUsuario[key].label}
                  value={formStateUsuario.values[key]}
                  helperText={
                    hasErrorUsuario(key)
                      ? formStateUsuario.errors[key][0]
                      : formSchemaUsuario[key].helperText
                  }
                  error={hasErrorUsuario(key)}
                  onChange={handleChangeUsuario}
                  type={formSchemaUsuario[key].type}
                  shrink={formSchemaUsuario[key].shrink}
                  opciones={formSchemaUsuario[key].opciones}
                  select={formSchemaUsuario[key].select}
                />
              ))}
            </CardContent>
          </Collapse>
        </CardContent>
      </Card>
      <Button
        color="primary"
        className={className.button}
        disabled={!formState.isValid}
        size="large"
        // type="submit"
        onClick={handleSubmit}
        variant="contained"
        title={SAVE}
      />

      <Button
        color="inherit"
        size="large"
        variant="contained"
        onClick={() => history.goBack()}
        title={BACK}
        //tooltip="Volver a la lista"
      />
    </div>
  );
};

PersonalCreate.propTypes = {
  history: PropTypes.object,
};

export default PersonalCreate;
