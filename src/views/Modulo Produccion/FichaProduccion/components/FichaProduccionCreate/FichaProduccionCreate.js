import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
  Box,
  Grid,
  Divider,
  List,
  ListItem,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { SAVE, BACK } from "constants/index";
import { Button, FormInput } from "components";
import useForm from "hooks/useForm.js";
import { RequestServer } from "service/RequestServer";
import MessageContext from "context/messageContext";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
import { formSchema, formSchemaInsumo, formSchemaPersonal } from "./formSchema";
import {
  schema as schemaValidate,
  schemaDetalle,
  schemaPersonal,
} from "./Schema.js";
import { useStyles } from "../../style/style";
import { Person } from "@material-ui/icons";
const initialValues = {
  isValid: false,
  values: {},
  touched: {},
  errors: {},
};
const FichaProduccionCreate = (props) => {
  const { history } = props;
  const className = useStyles();
  ///formularios
  const [formState, handleChange, hasError] = useForm(schemaValidate);
  const [
    formStateDetalle,
    handleChangeDetalle,
    hasErrorDetalle,
    resetDetalle,
  ] = useForm(schemaDetalle);
  const [
    formStatePersonal,
    handleChangePersonal,
    hasErrorPersonal,
    resetPersonal,
  ] = useForm(schemaPersonal);
  //message
  const { showSnack } = useContext(MessageContext);
  //get api array
  const [insumos, setInsumos] = useState([]);
  const [personales, setPersonales] = useState([]);
  const [productos, setProductos] = useState([]);

  //array de informacion de detalle
  const [produccionDetalle, setProduccionDetalle] = useState([]);
  const [personalesDetalle, setPersonalesDetalle] = useState([]);

  const getInsumos = async () => {
    try {
      const result = await RequestServer.GET(
        "http://localhost:8000/api/web/insumos"
      );
      console.log(result.data);
      var array = [];
      for (let i = 0; i < result.data.data.length; i++) {
        let item = result.data.data[i];
        let data = {
          id: item.idinsumo,
          nombre: item.nombre,
        };
        array.push(data);
      }
      formSchemaInsumo.insumo.opciones = array;
      setInsumos(result.data.data);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  const getPersonal = async () => {
    try {
      const result = await RequestServer.GET(
        "http://localhost:8000/api/web/personal"
      );
      console.log(result.data);
      var array = [];
      for (let i = 0; i < result.data.data.length; i++) {
        let item = result.data.data[i];
        let data = {
          id: item.idpersonal,
          nombre: item.nombre + " " + item.apellido,
        };
        array.push(data);
      }
      formSchemaPersonal.personal.opciones = array;
      setPersonales(result.data.data);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  const getProducto = async () => {
    try {
      const result = await RequestServer.GET(
        "http://localhost:8000/api/web/producto"
      );
      console.log(result.data);
      var array = [];
      for (let i = 0; i < result.data.data.length; i++) {
        let item = result.data.data[i];
        let data = {
          id: item.idproducto,
          nombre: item.nombre,
        };
        array.push(data);
      }
      formSchema.producto.opciones = array;
      setProductos(result.data.data);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };
  useEffect(() => {
    getInsumos();
    getPersonal();
    getProducto();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    const body = {
      ficha_produccion: formState.values,
      detalle_produccion: produccionDetalle,
      produccion_personal: personalesDetalle,
    };
    console.log(body);
    try {
      const rsp = await RequestServer.POST(
        "http://localhost:8000/api/web/produccion",
        body
      );
      showSnack(rsp.data.message, "success");
      history.goBack();
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };
  const onClickDeleteItem = (index) => {
    console.log(index);
    let newArr = [...produccionDetalle]; // copying the old datas array
    newArr.splice(index, 1);
    setProduccionDetalle(newArr);
  };
  const onClickDeleteItemPersonal = (index) => {
    console.log(index);
    let newArr = [...personalesDetalle]; // copying the old datas array
    newArr.splice(index, 1);
    setPersonalesDetalle(newArr);
  };
  const onClickAdd = () => {
    const insumo = formStateDetalle.values.insumo;
    if (produccionDetalle.find((detalle) => detalle.insumo === insumo))
      return showSnack("Ya existe el Insumo!!", "error");

    let newDetalles = [...produccionDetalle, { ...formStateDetalle.values }];
    setProduccionDetalle(newDetalles);
    resetDetalle(initialValues);
  };

  const onClickAddPersonal = () => {
    const personal = formStatePersonal.values.personal;
    if (personalesDetalle.find((detalle) => detalle.personal === personal))
      return showSnack("Ya existe el Personal!!", "error");

    let newDetalles = [...personalesDetalle, { ...formStatePersonal.values }];
    setPersonalesDetalle(newDetalles);
    resetPersonal(initialValues);
  };

  const findPersonal = (personal_id) => {
    for (let i = 0; i < personales.length; i++) {
      let item = personales[i];
      if (item.idpersonal === personal_id) return item;
    }
    return "No  existe";
  };

  const findInsumo = (insumo_id) => {
    for (let i = 0; i < insumos.length; i++) {
      let item = insumos[i];
      if (item.idinsumo === insumo_id) return item;
    }
    return "No Existe";
  };
  return (
    <div className={className.root}>
      <Card>
        <CardHeader title="Registro de Ficha de Produccion" />
        <CardContent>
          <Grid container spacing={1}>
            {Object.keys(formSchema).map((key) => (
              <Grid item md={6}>
                {" "}
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
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
      <Card
        className={className.cardDetalleMargin}
        style={{ marginBottom: 10 }}
      >
        <CardHeader title="AGREGAR INSUMOS" style={{ marginBottom: 3 }} />
        <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Grid container spacing={1}>
            {Object.keys(formSchemaInsumo).map((key) => (
              <Grid item md={3} sm={2} xs={12}>
                <FormInput
                  key={key}
                  name={key}
                  label={formSchemaInsumo[key].label}
                  value={formStateDetalle.values[key]}
                  helperText={
                    hasErrorDetalle(key)
                      ? formStateDetalle.errors[key][0]
                      : formSchemaInsumo[key].helperText
                  }
                  error={hasErrorDetalle(key)}
                  onChange={handleChangeDetalle}
                  type={formSchemaInsumo[key].type}
                  shrink={formSchemaInsumo[key].shrink}
                  opciones={formSchemaInsumo[key].opciones}
                  select={formSchemaInsumo[key].select}
                />
              </Grid>
            ))}
            <Grid item md={3} sm={2} xs={12}>
              <Button
                color="secondary"
                className={className.button}
                size="large"
                variant="contained"
                disabled={!formStateDetalle.isValid}
                onClick={onClickAdd}
                color="secondary"
                style={{ marginTop: 20 }}
                title={"AGREGAR"}
                tooltip="Agregar mas insumos"
              />
            </Grid>
          </Grid>
          {produccionDetalle.length > 0 ? (
            <>
              <Divider />
              <Grid container style={{ margin: 10 }}>
                <Typography variant="h5">RESUMEN DE INUSMO A OCUPAR</Typography>
              </Grid>
            </>
          ) : null}
          <List className={className.lista}>
            {produccionDetalle.map(({ insumo, cantidad }, index) => (
              <div key={insumo}>
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
                        {findInsumo(insumo).nombre}
                      </Typography>
                      <Typography>{`Cantidad: ${cantidad} `}</Typography>
                      <Typography variant="caption">{`Unidad: ${
                        findInsumo(insumo).unidad_medida.nombre
                      } `}</Typography>
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
            ))}
          </List>
        </CardContent>
      </Card>
      <Card
        className={className.cardDetalleMargin}
        style={{ marginBottom: 10 }}
      >
        <CardHeader
          title="ASIGANCION DE PERSONAL"
          style={{ marginBottom: 3 }}
        />
        <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
          <Grid container spacing={1}>
            {Object.keys(formSchemaPersonal).map((key) => (
              <Grid item md={3} sm={2} xs={12}>
                <FormInput
                  key={key}
                  name={key}
                  label={formSchemaPersonal[key].label}
                  value={formStatePersonal.values[key]}
                  helperText={
                    hasErrorPersonal(key)
                      ? formStatePersonal.errors[key][0]
                      : formSchemaPersonal[key].helperText
                  }
                  error={hasErrorPersonal(key)}
                  onChange={handleChangePersonal}
                  type={formSchemaPersonal[key].type}
                  shrink={formSchemaPersonal[key].shrink}
                  opciones={formSchemaPersonal[key].opciones}
                  select={formSchemaPersonal[key].select}
                />
              </Grid>
            ))}
            <Grid item md={3} sm={2} xs={12}>
              <Button
                color="secondary"
                className={className.button}
                size="large"
                variant="contained"
                disabled={!formStatePersonal.isValid}
                onClick={onClickAddPersonal}
                color="secondary"
                style={{ marginTop: 20 }}
                title={"AGREGAR"}
                tooltip="Agregar mas personal asignado"
              />
            </Grid>
          </Grid>
          {personalesDetalle.length > 0 ? (
            <>
              <Divider />
              <Grid container style={{ margin: 10 }}>
                <Typography variant="h5">
                  RESUMEN DE PERSONAL ASIGNADO
                </Typography>
              </Grid>
            </>
          ) : null}
          <List className={className.lista}>
            {personalesDetalle.map(({ personal }, index) => (
              <div key={personal}>
                <ListItem>
                  <div className={className.cajaPadre}>
                    <Avatar className={className.azulAvatar}>
                      <Person />
                    </Avatar>
                    <Box
                      display="flex"
                      flexDirection="column"
                      flex={1}
                      style={{ marginLeft: 10 }}
                    >
                      <Typography variant="h5">{`Nombre: ${
                        findPersonal(personal).nombre
                      } `}</Typography>
                      <Typography>{`Apellido: ${
                        findPersonal(personal).apellido
                      } `}</Typography>
                      <Typography variant="caption">{`Tipo: ${
                        findPersonal(personal).tipo_personal.nombre
                      } `}</Typography>
                    </Box>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => onClickDeleteItemPersonal(index)}
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                  </div>
                </ListItem>
                <Divider variant="inset" component="li" />
              </div>
            ))}
          </List>
        </CardContent>
      </Card>

      <Button
        color="primary"
        className={className.button}
        disabled={
          !formState.isValid ||
          !(produccionDetalle.length > 0) ||
          !(personalesDetalle.length > 0)
        }
        size="large"
        variant="contained"
        onClick={handleSubmit}
        title={SAVE}
      />
      <Button
        color="inherit"
        size="large"
        variant="contained"
        onClick={() => history.goBack()}
        title={BACK}
      />
    </div>
  );
};

FichaProduccionCreate.propTypes = {
  history: PropTypes.object,
};

export default FichaProduccionCreate;
