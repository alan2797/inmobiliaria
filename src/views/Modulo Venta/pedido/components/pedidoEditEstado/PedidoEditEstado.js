import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Box,
  MenuItem,
} from "@material-ui/core";
import { SAVE, BACK, API, ROUTE_PARAM } from "constants/index";
import { FormInput } from "components";
import useForm from "hooks/useForm.js";
import { RequestServer } from "service/RequestServer";
import MessageContext from "context/messageContext";
import formSchema from "./formSchema";
import { schema as schemaValidate } from "./Schema.js";
import { useStyles } from "../../style/style";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { async } from "validate.js";

const PedidoEditEstado = (props) => {
  const { history } = props;
  const {id} = useParams();
  const className = useStyles();
  const [formState, handleChange, hasError] = useForm(schemaValidate);
  const { showSnack } = useContext(MessageContext);
  const [pedido, setPedido] = useState(null);

  const fetchData = async () => {
    try {
      const result = await RequestServer.GET(ROUTE_PARAM(API.PEDIDO.EDIT, { id }));
      setPedido(result.data.data);
    } catch (error) {
      console.log("fetchData", error);
      showSnack(error.message, error.type);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const rsp = await RequestServer.PUT(ROUTE_PARAM(API.PEDIDO.EDIT, { id }), formState.values);
      showSnack(rsp.data.message, "success");
      await sendNotificacion(formState.values.observacion);
      history.goBack();
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  const sendNotificacion = async (message) => {
    // let token = 'dLzrL6Q1QKuQiRExBFARu-:APA91bEWIHfPzcpXVDXY6yPGZkRQrwfYjCOjC5Dvj0srXWYhEPVpEtuR00t43AdPuD39RxadgWBFSkxsk24Vdop4kGLbVSx4bskPevH11b8-hcRaVI6H-OttLM2uBqlPiviiSAi09lCa';
    let token = pedido.cliente.token; console.log(token);
    let url = 'https://fcm.googleapis.com/fcm/send';
    let config = {
      headers: { Authorization: `key=AAAAaCDI5Xs:APA91bERZTbtiYzQJD0U8AcWkgfThxDgef5f4fWvSgrbsq0fQzlaOo068vKIgZX2wzJA6KDT5pTtIUR-N425mwjDYtnSViRyeTZsdCo-l6oQh2XUKBG8FuV1pnHI8rUMRGC8W0R0Ojko` },
    }
   await Axios.post(url, {
      "to" : token,
      "notification" : {
        "body" : 'Observacion: ' + message,
        "title" : "Notificacion pedido"
      },
      "data": {
        "title": "Notificacion pedido",
        "message": 'Observacion: ' + message
      }
    }, config);
  }

  return (
    <div className={className.root}>
      <Card>
        <CardHeader title="Edicion estado" />
        <CardContent>
          <form onSubmit={handleSubmit}>
            {Object.keys(formSchema).map((key) => (
              <FormInput
                key={key}
                name={key}
                label={formSchema[key].label}
                value={formState.values[key]}
                select={formSchema[key].select}
                helperText={
                  hasError(key)
                    ? formState.errors[key][0]
                    : formSchema[key].helperText
                }
                error={hasError(key)}
                onChange={handleChange}
                type={formSchema[key].type}
              >
                {formSchema[key].select &&
                formSchema[key].options.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </FormInput>
            ))}

            <Button
              color="primary"
              className={className.button}
              disabled={!formState.isValid }
              size="large"
              type="submit"
              variant="contained"
            >
              {SAVE}
            </Button>

            <Button
              color="inherit"
              size="large"
              variant="contained"
              onClick={() => history.goBack()}
            >
              {BACK}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

PedidoEditEstado.propTypes = {
  history: PropTypes.object,
};

export default PedidoEditEstado;
