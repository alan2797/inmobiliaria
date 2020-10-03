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
import { formSchema } from "./formSchema";
import { schema as schemaValidate } from "./Schema.js";
import { useStyles } from "../../style/style";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";
import { Button } from "components/Buttom";
import Web3 from "web3";
import { abiContrato } from "./abi";

const ContratoCreate = (props) => {
  const { history } = props;
  const className = useStyles();
  const [formState, handleChange, hasError] = useForm(schemaValidate);
  const { showSnack } = useContext(MessageContext);
  const [expanded, setExpanded] = React.useState(false);
  const [cliente, setCliente] = React.useState([]);
  const [inmueble, setInmueble] = React.useState([]);
  const web3 = new Web3("http://127.0.0.1:7545");
  const contractAddr = "0x6d0b958ab317186CFb743fB6D7c79F0c09E91C18";

  const listaContratos = new web3.eth.Contract(abiContrato, contractAddr);
  const getCliente = async () => {
    try {
      const result = await RequestServer.GET(
        "http://localhost:5000/api/cliente"
      );
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
      formSchema.clienteId.opciones = array;
      setCliente(array);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };
  const getInmueble = async () => {
    try {
      const result = await RequestServer.GET(
        "http://localhost:5000/api/inmueble"
      );
      console.log(result.data);
      var array = [];
      for (let i = 0; i < result.data.data.length; i++) {
        let item = result.data.data[i];
        let data = {
          id: item.id,
          nombre:
            item.tipo +
            " - " +
            item.propietario.nombre +
            " " +
            item.propietario.apellido,
        };
        array.push(data);
      }
      formSchema.inmuebleId.opciones = array;
      setInmueble(array);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  useEffect(() => {
    // getCliente();
    getInmueble();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    ///setear
    const accounts = await window.ethereum.enable();
    console.log(",otra manera , ", accounts);
    const account = accounts[0];
    const gas = await listaContratos.methods
      .setContrato(
        formState.values.tipo,
        formState.values.duracion,
        formState.values.valor,
        formState.values.moneda,
        formState.values.fechaFirma,
        formState.values.fechaVencimiento,
        formState.values.clienteId,
        formState.values.inmuebleId
      )
      .estimateGas();
    console.log("gas ", gas);
    const result2 = await listaContratos.methods
      .setContrato(
        formState.values.tipo,
        formState.values.duracion,
        formState.values.valor,
        formState.values.moneda,
        formState.values.fechaFirma,
        formState.values.fechaVencimiento,
        formState.values.clienteId,
        formState.values.inmuebleId
      )
      .send({
        from: account,
        gas,
      });
    if (result2) {
      alert("Datos de transaccion con la blockchain", result2);
      showSnack("se registro en la blockchain correctamente", "success");
      history.goBack();
    }
    console.log("result de seterar ", result2);
  };
  ///collapse
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <div className={className.root}>
      <Card className={className.root} style={{ marginBottom: 10 }}>
        <CardHeader title="Registro de Contratos con Blockchain" />
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

ContratoCreate.propTypes = {
  history: PropTypes.object,
};

export default ContratoCreate;
