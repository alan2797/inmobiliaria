import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { SAVE, BACK } from "constants/index";
import { Button, FormInput } from "components";
import useForm from "hooks/useForm.js";
import { RequestServer } from "service/RequestServer";
import MessageContext from "context/messageContext";
import formSchema from "./formSchema";
import { schema as schemaValidate } from "./Schema.js";
import { useStyles } from "../../style/style";

const InsumoCreate = (props) => {
  const { history } = props;
  const className = useStyles();
  const [unidades, setUnidades] = useState([]);
  const [formState, handleChange, hasError] = useForm(schemaValidate);
  const { showSnack } = useContext(MessageContext);

  const getUnidadMedida = async () => {
    try {
      const result = await RequestServer.GET(
        "http://localhost:8000/api/web/medidas"
      );
      var array = [];
      for (let i = 0; i < result.data.data.length; i++) {
        let item = result.data.data[i];
        let data = {
          id: item.idunidad_medida,
          nombre: item.nombre + " " + item.abreviatura,
        };
        array.push(data);
      }
      console.log(result.data);
      formSchema.fkidunidad_medida.opciones = array;
      setUnidades(array);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  useEffect(() => {
    getUnidadMedida();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState.values);
    try {
      const rsp = await RequestServer.POST(
        "http://localhost:8000/api/web/insumos",
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
      <Card>
        <CardHeader title="Registro de insumo" />
        <CardContent>
          <form onSubmit={handleSubmit}>
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
              type="submit"
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
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

InsumoCreate.propTypes = {
  history: PropTypes.object,
};

export default InsumoCreate;
