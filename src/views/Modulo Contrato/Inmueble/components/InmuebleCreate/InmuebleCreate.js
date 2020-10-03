import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  Avatar,
  IconButton,
  Box,
} from "@material-ui/core";
import Collapse from "@material-ui/core/Collapse";
import { SAVE, BACK } from "constants/index";
import { FormInput } from "components";
import useForm from "hooks/useForm.js";
import { RequestServer } from "service/RequestServer";
import MessageContext from "context/messageContext";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import {
  formSchema,
  formSchemaUbicacion,
  formSchemaCaracteristica,
} from "./formSchema";
import {
  schema as schemaValidate,
  schemaUbicacion as schemaUbicacionValidate,
  schemaCaracteristica as schemaCaracteristicaValidate,
} from "./Schema.js";
import { useStyles } from "../../style/style";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";
import { Button } from "components/Buttom";
import Map from "./Maps";
const initialValues = {
  isValid: false,
  values: {},
  touched: {},
  errors: {},
};
const InmuebleCreate = (props) => {
  const { history } = props;
  const className = useStyles();
  const [formState, handleChange, hasError] = useForm(schemaValidate);
  const [
    formStateUbicacion,
    handleChangeUbicacion,
    hasErrorUbicacion,
  ] = useForm(schemaUbicacionValidate);

  const [
    formStateCaracteristica,
    handleChangeCaracteristica,
    hasErrorCaracteristica,
    resetCaracteristica,
  ] = useForm(schemaCaracteristicaValidate);
  const { showSnack } = useContext(MessageContext);
  const [expanded, setExpanded] = React.useState(false);
  const [propietario, setPropietario] = React.useState([]);
  const [caracteristicas, setCaracteristicas] = React.useState([]);
  const [coordenadas, setCoordenadas] = React.useState(null);
  const [step, setStep] = React.useState(0);

  //array de informacion de detalle
  const [inmuebleCaracteristica, setInmuebleCaracteristica] = useState([]);
  const getPropietario = async () => {
    try {
      const result = await RequestServer.GET(
        "http://localhost:5000/api/propietario"
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
      formSchema.propietarioId.opciones = array;
      setPropietario(array);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };
  const getCaracteristicas = async () => {
    try {
      const result = await RequestServer.GET(
        "http://localhost:5000/api/caracteristica"
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
      formSchemaCaracteristica.caracteristicaId.opciones = array;
      setCaracteristicas(array);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };
  useEffect(() => {
    getPropietario();
    getCaracteristicas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (typeof coordenadas.longitud !== "undefined") {
      formState.values.longitud = coordenadas.longitud;
      formState.values.latitud = coordenadas.latitud;
    }
    const body = {
      inmueble: formState.values,
      ubicacion: formStateUbicacion.values,
      caracteristicas: inmuebleCaracteristica,
    };
    console.log(body);
    try {
      const rsp = await RequestServer.POST(
        "http://localhost:5000/api/inmueble/create",
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
  const onClickMapa = (event) => {
    console.log(event);
    console.log("latitud", event.latLng.lat());
    console.log("longitud", event.latLng.lng());
    var newCordenada = { ...coordenadas };
    newCordenada.latitud = event.latLng.lat();
    newCordenada.longitud = event.latLng.lng();

    setCoordenadas(newCordenada);
  };

  const onClickAdd = () => {
    const caracteristicaId = formStateCaracteristica.values.caracteristicaId;
    if (
      inmuebleCaracteristica.find(
        (caracteristica) => caracteristica.caracteristicaId === caracteristicaId
      )
    )
      return showSnack("Ya existe la caracteristica!!", "error");

    let newCaracteristica = [
      ...inmuebleCaracteristica,
      { ...formStateCaracteristica.values },
    ];
    setInmuebleCaracteristica(newCaracteristica);
    resetCaracteristica(initialValues);
  };
  const findCaracteristica = (caracteristica_id) => {
    for (let i = 0; i < caracteristicas.length; i++) {
      let item = caracteristicas[i];
      if (item.id === caracteristica_id) return item;
    }
    return "No Existe";
  };
  const onClickDeleteItem = (index) => {
    console.log(index);
    let newArr = [...inmuebleCaracteristica]; // copying the old datas array
    newArr.splice(index, 1);
    setInmuebleCaracteristica(newArr);
  };
  return (
    <div className={className.root}>
      {step === 0 ? (
        <Card className={className.root} style={{ marginBottom: 10 }}>
          <CardHeader title="Registro de Inmueble" />
          <Divider />
          <CardContent>
            <Grid container direction="row" spacing={2}>
              {Object.keys(formSchema).map((key) => (
                <Grid item md={4}>
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
      ) : null}
      {step === 1 ? (
        <Card style={{ marginTop: 10, marginBottom: 10 }}>
          <CardContent>
            <CardHeader title="Datos de Ubicación" />
            <Divider />
            <Grid container direction="row" spacing={2}>
              <Grid item md={12}>
                <Map
                  googleMapURL={`https://maps.googleapis.com/maps/api/js/key=AIzaSyBQFESUdklXtd-Yh8W2Ot1zHk9kEieS_IY`}
                  containerElement={<div style={{ height: "350px" }} />}
                  mapElement={<div style={{ height: "350px" }} />}
                  loadingElement={<p>Cargando</p>}
                  onClick={onClickMapa}
                  coordenadas={coordenadas}
                />
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={2}>
              {Object.keys(formSchemaUbicacion).map((key) => (
                <Grid item md={4}>
                  <FormInput
                    key={key}
                    name={key}
                    label={formSchemaUbicacion[key].label}
                    value={formStateUbicacion.values[key]}
                    helperText={
                      hasErrorUbicacion(key)
                        ? formStateUbicacion.errors[key][0]
                        : formSchemaUbicacion[key].helperText
                    }
                    error={hasErrorUbicacion(key)}
                    onChange={handleChangeUbicacion}
                    type={formSchemaUbicacion[key].type}
                    shrink={formSchemaUbicacion[key].shrink}
                    opciones={formSchemaUbicacion[key].opciones}
                    select={formSchemaUbicacion[key].select}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ) : null}

      {step === 2 ? (
        <Card
          className={className.cardDetalleMargin}
          style={{ marginBottom: 10 }}
        >
          <CardHeader
            title="AGREGAR CARCTERISTICAS"
            style={{ marginBottom: 3 }}
          />
          <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
            <Grid container spacing={1}>
              {Object.keys(formSchemaCaracteristica).map((key) => (
                <Grid item md={3} sm={2} xs={12}>
                  <FormInput
                    key={key}
                    name={key}
                    label={formSchemaCaracteristica[key].label}
                    value={formStateCaracteristica.values[key]}
                    helperText={
                      hasErrorCaracteristica(key)
                        ? formStateCaracteristica.errors[key][0]
                        : formSchemaCaracteristica[key].helperText
                    }
                    error={hasErrorCaracteristica(key)}
                    onChange={handleChangeCaracteristica}
                    type={formSchemaCaracteristica[key].type}
                    shrink={formSchemaCaracteristica[key].shrink}
                    opciones={formSchemaCaracteristica[key].opciones}
                    select={formSchemaCaracteristica[key].select}
                  />
                </Grid>
              ))}
              <Grid item md={3} sm={2} xs={12}>
                <Button
                  color="secondary"
                  className={className.button}
                  size="large"
                  variant="contained"
                  disabled={!formStateCaracteristica.isValid}
                  onClick={onClickAdd}
                  color="secondary"
                  style={{ marginTop: 20 }}
                  title={"AGREGAR"}
                  tooltip="Agregar mas insumos"
                />
              </Grid>
            </Grid>
            {inmuebleCaracteristica.length > 0 ? (
              <>
                <Divider />
                <Grid container style={{ margin: 10 }}>
                  <Typography variant="h5">
                    RESUMEN DE LAS CARACTERISTICAS DEL INMUEBLE
                  </Typography>
                </Grid>
              </>
            ) : null}
            <List className={className.lista}>
              {inmuebleCaracteristica.map(
                ({ caracteristicaId, descripcion }, index) => (
                  <div key={caracteristicaId}>
                    <ListItem>
                      <div className={className.cajaPadre}>
                        <Avatar className={className.greenAvatar}>
                          <AssignmentIcon />
                        </Avatar>
                        <Box
                          display="flex"
                          flexDirection="column"
                          flex={1}
                          style={{ marginLeft: 10 }}
                        >
                          <Typography variant="h5">
                            {findCaracteristica(caracteristicaId).nombre}
                          </Typography>
                          <Typography>{`Descripcion: ${descripcion} `}</Typography>
                        </Box>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => onClickDeleteItem(index)}
                        >
                          <DeleteIcon style={{ color: "red" }} />
                        </IconButton>
                      </div>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </div>
                )
              )}
            </List>
          </CardContent>
        </Card>
      ) : null}
      {step === 2 ? null : (
        <Button
          color="primary"
          className={className.button}
          size="large"
          disabled={
            step === 0
              ? !formState.isValid
              : step === 1
              ? !formStateUbicacion
              : false
          }
          // type="submit"
          onClick={() => setStep(step + 1)}
          variant="contained"
          title={"SIGUIENTE"}
        />
      )}

      {step === 0 ? null : (
        <Button
          color="inherit"
          size="large"
          variant="contained"
          onClick={() => setStep(step - 1)}
          title={"VOLVER"}
          //tooltip="Volver a la lista"
        />
      )}
      {step === 2 ? (
        <>
          {" "}
          <Button
            color="primary"
            className={className.button}
            disabled={
              !formState.isValid ||
              !formStateUbicacion ||
              !inmuebleCaracteristica.length > 0
            }
            size="large"
            // type="submit"
            onClick={handleSubmit}
            variant="contained"
            title={"GUARDAR INFORMACION"}
          />
          <Button
            color="inherit"
            size="large"
            variant="contained"
            onClick={() => history.goBack()}
            title={"IR AL LISTADO"}
            //tooltip="Volver a la lista"
          />
        </>
      ) : null}
    </div>
  );
};

InmuebleCreate.propTypes = {
  history: PropTypes.object,
};

export default InmuebleCreate;
