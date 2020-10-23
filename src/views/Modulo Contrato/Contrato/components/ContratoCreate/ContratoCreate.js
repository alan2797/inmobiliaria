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
import { FormInput, StepperComponent, CardView } from "components";
import useForm from "hooks/useForm.js";
import { RequestServer } from "service/RequestServer";
import MessageContext from "context/messageContext";
import {
  formSchema,
  formSchemaInmueble,
  formSchemaPropietario,
  formSchemaInquilino,
  formSchemaDuracion,
} from "./formSchema";
import {
  schema as schemaValidate,
  schemaInmueble as schemaInmuebleValidate,
  schemaPropietario as schemaPropietarioValidate,
  schemaInquilino as schemaInquilinoValidate,
  schemaDuracion as schemaDuracionValidate,
} from "./Schema.js";
import { useStyles } from "../../style/style";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";
import { Button } from "components/Buttom";
import Web3 from "web3";
import { abiContrato } from "./abi";
import { abiContrato2 } from "./abi2";
import { nombreSteps } from "./data";
import { ContratoView } from "./contratoView";
import {ContratoDocPdf} from './ContratoDocPdf'
import { Page, Text, View, Document, StyleSheet,PDFViewer ,PDFDownloadLink } from '@react-pdf/renderer';
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4'
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  }
});
const ContratoCreate = (props) => {
  const { history } = props;
  const className = useStyles();
  const [formState, handleChange, hasError] = useForm(schemaValidate);
  const [formStateInmueble, handleChangeInmueble, hasErrorInmueble] = useForm(
    schemaInmuebleValidate
  );
  const [
    formStatePropietario,
    handleChangePropietario,
    hasErrorPropietario,
  ] = useForm(schemaPropietarioValidate);
  const [
    formStateInquilino,
    handleChangeInquilino,
    hasErrorInquilino,
  ] = useForm(schemaInquilinoValidate);
  const [formStateDuracion, handleChangeDuracion, hasErrorDuracion] = useForm(
    schemaDuracionValidate
  );
  const { showSnack } = useContext(MessageContext);
  const [expanded, setExpanded] = React.useState(false);
  const [pdf, setPdf] = React.useState(false);
  const [cliente, setCliente] = React.useState([]);
  const [inmueble, setInmueble] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const web3 = new Web3("http://127.0.0.1:7545");
  const contractAddr = "0x32b701a843188E4EAc5954caAF659404835f5006";

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
      formSchemaInmueble.inmuebleId.opciones = array;
      setInmueble(result.data.data);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  useEffect(() => {
    // getCliente();
    getInmueble();
    probandoSet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const probandoSet = async () => {
    const accounts = await window.ethereum.enable();
    console.log(",otra manera , ", accounts);
    console.log(listaContratos.methods)
    const account = accounts[0];
    const gas = await listaContratos.methods
      .setContrato(
        "12/10/2020",
        '12/10/2022',
        '2121',
        'tipo',
        'entrega de pago',
        500,
        'dolares',
        'P',
        1,
        2,
        3
      )
      .estimateGas();
    console.log("gas ", gas);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(formStateInmueble.values);
    console.log(formStatePropietario.values);
    console.log(formStateInquilino.values);
    console.log(formStateDuracion.values);
    console.log(findCaracteristicas(formStateInmueble.values.inmuebleId));
    ///setear
    const accounts = await window.ethereum.enable();
    console.log(",otra manera , ", accounts);
    console.log(listaContratos.methods)
    const account = accounts[0];
    var fechaInicio = formStateDuracion.values.fecha_inicio;
    var fechaFinal = formStateDuracion.values.fecha_final;
    var tipoPago = formStateDuracion.values.tipo_pago;
    var tipo =  formStateInmueble.values.tipo;
    var entregaPago =  formStateDuracion.values.entrega_pago;
    var monto = formStateDuracion.values.monto;
    var moneda = formStateDuracion.values.moneda;
    var inmuebleId = formStateInmueble.values.inmuebleId;
    var propietarioId = findCaracteristicas(formStateInmueble.values.inmuebleId).propietarioId;
    console.log(fechaInicio);
    console.log(fechaFinal);
    console.log(tipoPago);
    console.log(tipo);
    console.log(entregaPago);
    console.log(monto);
    console.log(moneda);
    const gas = await listaContratos.methods
      .setContrato(
        fechaInicio,
        fechaFinal,
        tipoPago,
        tipo,
        entregaPago,
        monto,
        moneda,
        'Proceso',
        inmuebleId,
        propietarioId,
        2
      )
      .estimateGas();
    console.log("gas ", gas);
   
    const result2 = await listaContratos.methods
      .setContrato(
        fechaInicio,
        fechaFinal,
        tipoPago,
        tipo,
        entregaPago,
        monto,
        moneda,
        'Proceso',
        inmuebleId,
        propietarioId,
        2
      )
      .send({
        from: account,
        gas,
      });
      console.log(result2)
    if (result2) {
      console.log(result2)
      showSnack("se registro en la blockchain correctamente", "success");
      history.goBack();
    }
    console.log("result de seterar ", result2);
  };
  ///collapse
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const findCaracteristicas = (inmueble_id) => {
    // var inmueble_id = formStateInmueble.values.inmuebleId;
    for (let i = 0; i < inmueble.length; i++) {
      let item = inmueble[i];
      if (item.id === inmueble_id) return item;
    }
    return [];
  };
  const MyDoc = () => (
    <Document>
      <Page>
        <Text>PROBANDO</Text>
      </Page>
    </Document>
  )
  const descargar = ()=> {
    //setPdf(false)
   
    //setPdf(false)
    setTimeout(() => {
      setPdf(true)
    }, 1);
  }
  return (
    <div className={className.root}>
      <Card className={className.root} style={{ marginBottom: 10 }}>
        <CardHeader title="Registro de Contratos con Blockchain" /> 
        <Divider />
        <StepperComponent
          nombreSteps={nombreSteps}
          activeStep={activeStep}
          steppersContent={[
            <>
              <Grid container direction="row" spacing={4}>
                
                {Object.keys(formSchemaInmueble).map((key) => (
                  <Grid item md={4}>
                    <FormInput
                      id={formSchemaInmueble[key].id}
                      key={key}
                      name={key}
                      label={formSchemaInmueble[key].label}
                      value={formStateInmueble.values[key]}
                      helperText={
                        hasErrorInmueble(key)
                          ? formStateInmueble.errors[key][0]
                          : formSchemaInmueble[key].helperText
                      }
                      error={hasErrorInmueble(key)}
                      onChange={handleChangeInmueble}
                      type={formSchemaInmueble[key].type}
                      shrink={formSchemaInmueble[key].shrink}
                      opciones={formSchemaInmueble[key].opciones}
                      select={formSchemaInmueble[key].select}
                    />
                  </Grid>
                ))}

                {formStateInmueble.values.inmuebleId ? (
                  <Grid item md={12}>
                    <Divider />

                    <h3 style={{ marginTop: 8 }}>
                      Caracteristicas del inmueble
                    </h3>
                  </Grid>
                ) : null}
                {formStateInmueble.values.inmuebleId ? (
                  <>
                    {findCaracteristicas(
                      formStateInmueble.values.inmuebleId
                    ).inmuebleCaracteristica.map((data, index) => (
                      <Grid item md={4}>
                        <CardView data={data} />
                      </Grid>
                    ))}
                  </>
                ) : null}
              </Grid>
            </>,
            <Grid container direction="row" spacing={4}>
              {Object.keys(formSchemaPropietario).map((key) => (
                <Grid item md={4}>
                  <FormInput
                    id={formSchemaPropietario[key].id}
                    key={key}
                    name={key}
                    label={formSchemaPropietario[key].label}
                    value={formStatePropietario.values[key]}
                    helperText={
                      hasErrorPropietario(key)
                        ? formStatePropietario.errors[key][0]
                        : formSchemaPropietario[key].helperText
                    }
                    error={hasErrorPropietario(key)}
                    onChange={handleChangePropietario}
                    type={formSchemaPropietario[key].type}
                    shrink={formSchemaPropietario[key].shrink}
                    opciones={formSchemaPropietario[key].opciones}
                    select={formSchemaPropietario[key].select}
                  />
                </Grid>
              ))}
            </Grid>,
            <Grid container direction="row" spacing={4}>
              {Object.keys(formSchemaInquilino).map((key) => (
                <Grid item md={4}>
                  <FormInput
                    id={formSchemaInquilino[key].id}
                    key={key}
                    name={key}
                    label={formSchemaInquilino[key].label}
                    value={formStateInquilino.values[key]}
                    helperText={
                      hasErrorInquilino(key)
                        ? formStateInquilino.errors[key][0]
                        : formSchemaInquilino[key].helperText
                    }
                    error={hasErrorInquilino(key)}
                    onChange={handleChangeInquilino}
                    type={formSchemaInquilino[key].type}
                    shrink={formSchemaInquilino[key].shrink}
                    opciones={formSchemaInquilino[key].opciones}
                    select={formSchemaInquilino[key].select}
                  />
                </Grid>
              ))}
            </Grid>,
            <Grid container direction="row" spacing={4}>
              {Object.keys(formSchemaDuracion).map((key) => (
                <Grid item md={4}>
                  <FormInput
                    id={formSchemaDuracion[key].id}
                    key={key}
                    name={key}
                    label={formSchemaDuracion[key].label}
                    value={formStateDuracion.values[key]}
                    helperText={
                      hasErrorDuracion(key)
                        ? formStateDuracion.errors[key][0]
                        : formSchemaDuracion[key].helperText
                    }
                    error={hasErrorDuracion(key)}
                    onChange={handleChangeDuracion}
                    type={formSchemaDuracion[key].type}
                    shrink={formSchemaDuracion[key].shrink}
                    opciones={formSchemaDuracion[key].opciones}
                    select={formSchemaDuracion[key].select}
                  />
                </Grid>
              ))}
            </Grid>,
            <>
              <ContratoView
                inmueble={formStateInmueble.values}
                propietario={formStatePropietario.values}
                inquilino={formStateInquilino.values}
                duracion={formStateDuracion.values}
                extra={findCaracteristicas(formStateInmueble.values.inmuebleId)}
              />
              <div>{pdf && <PDFDownloadLink document={<ContratoDocPdf
                inmueble={formStateInmueble.values}
                propietario={formStatePropietario.values}
                inquilino={formStateInquilino.values}
                duracion={formStateDuracion.values}
                extra={findCaracteristicas(formStateInmueble.values.inmuebleId)}
              />} fileName="contrato.pdf">
            {({ blob, url, loading, error }) => loading ? 'Loading document...' : <Button
          color="secondary"
          className={className.button}
          size="large"
          // type="submit"
          onClick={()=>setPdf(false)}
          variant="contained"
          title={'DESCARGAR PDF'}
          style={{backgroundColor:'red'}}
        />}
          </PDFDownloadLink>}</div>
              {!pdf && <Button
                    color="primary"
                    className={className.button}
                    size="large"
                    // type="submit"
                    onClick={descargar}
                    variant="contained"
                    title={'Transformar a PDF'}
                  />}
            </>,
          ]}
          onClickSiguiente={() => setActiveStep(activeStep + 1)}
          onClickAnterior={() => setActiveStep(activeStep - 1)}
          onClickReset={() => setActiveStep(0)}
        />
        {/* <CardContent>
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
                </CardContent>*/}
      </Card>
      <Button
        color="primary"
        className={className.button}
        disabled={!activeStep === 5}
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
