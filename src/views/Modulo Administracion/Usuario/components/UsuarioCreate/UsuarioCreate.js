import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { SAVE, BACK } from "constants/index";
import { FormInput, Button } from "components";
import useForm from "hooks/useForm.js";
import { RequestServer } from "service/RequestServer";
import MessageContext from "context/messageContext";
import formSchema from "./formSchema";
import { schema as schemaValidate } from "./Schema.js";
import { useStyles } from "../../style/style";

const UsuarioCreate = (props) => {
  const { history } = props;
  const className = useStyles();
  const [peronsales, setPeronsales] = useState([]);
  const [rol, setRol] = useState([]);
  const [formState, handleChange, hasError] = useForm(schemaValidate);
  const { showSnack } = useContext(MessageContext);

  const getPersonal = async () => {
    try {
      const result = await RequestServer.GET(
        "http://localhost:5000/api/personal/sinAcceso"
      );
      var array = [];
      for (let i = 0; i < result.data.data.length; i++) {
        let item = result.data.data[i];
        let data = {
          id: item.id,
          nombre: item.nombre,
        };
        array.push(data);
      }
      console.log(result.data);
      formSchema.personalId.opciones = array;
      setPeronsales(array);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };
  const getRoles = async () => {
    try {
      const result = await RequestServer.GET("http://localhost:5000/api/rol");
      var array = [];
      for (let i = 0; i < result.data.data.length; i++) {
        let item = result.data.data[i];
        let data = {
          id: item.id,
          nombre: item.nombre,
        };
        array.push(data);
      }
      console.log(result.data);
      formSchema.rolId.opciones = array;
      setRol(array);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };
  useEffect(() => {
    getPersonal();
    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState.values);
    // formState.values.unidad_id = unidad.id;
    try {
      const rsp = await RequestServer.POST(
        "http://localhost:5000/api/usuario/create",
        formState.values
      );
      showSnack(rsp.data.message, "success");
      history.goBack();
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  return (
    <div className={className.root}>
      <Card className={className.root}>
        <CardHeader title="Registro de Usuario" />
        <CardContent>
          {Object.keys(formSchema).map((key) => (
            <FormInput
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
          ))}

          <Button
            color="primary"
            className={className.button}
            disabled={!formState.isValid}
            size="large"
            //type="submit"
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
          />
        </CardContent>
      </Card>
    </div>
  );
};

UsuarioCreate.propTypes = {
  history: PropTypes.object,
};

export default UsuarioCreate;
