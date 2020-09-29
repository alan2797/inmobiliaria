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
import CardView from "components/Card/Card";
import useForm from "hooks/useForm.js";
import { RequestServer } from "service/RequestServer";
import MessageContext from "context/messageContext";
import { formSchema, formSchemaInsumo } from "./formSchema";
import { schema as schemaValidate, schemaDetalle } from "./Schema.js";
import { useStyles } from "../../style/style";
import AssignmentIcon from "@material-ui/icons/Assignment";
import DeleteIcon from "@material-ui/icons/Delete";
const initialValues = {
  isValid: false,
  values: {},
  touched: {},
  errors: {},
};
const CompraCreate = (props) => {
  const { history } = props;
  const className = useStyles();
  const [formState, handleChange, hasError] = useForm(schemaValidate);
  const [
    formStateDetalle,
    handleChangeDetalle,
    hasErrorDetalle,
    reset,
  ] = useForm(schemaDetalle);
  const { showSnack } = useContext(MessageContext);
  const [insumos, setInsumos] = useState([]);
  const [proveedores, setProveedores] = useState([]);

  const [compraDetalle, setCompraDetalle] = useState([]);

  const getInsumos = async () => {
    try {
      const result = await RequestServer.GET(
        "http://localhost:8000/api/web/insumos"
      );
      var array = [];
      for (let i = 0; i < result.data.data.length; i++) {
        let item = result.data.data[i];
        let data = {
          id: item.idinsumo,
          nombre: item.nombre,
        };
        array.push(data);
      }
      formSchemaInsumo.id.opciones = array;
      setInsumos(result.data.data);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };
  const getProveedor = async () => {
    try {
      const result = await RequestServer.GET(
        "http://localhost:8000/api/web/proveedor"
      );
      console.log(result.data);
      var array = [];
      for (let i = 0; i < result.data.data.length; i++) {
        let item = result.data.data[i];
        let data = {
          id: item.idproveedor,
          nombre: item.nombre + " " + item.apellido,
        };
        array.push(data);
      }
      formSchema.fkidproveedor.opciones = array;
      setProveedores(array);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };
  useEffect(() => {
    getInsumos();
    getProveedor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async () => {
    //event.preventDefault();
    const body = {
      fecha_hora: formState.values.fecha_hora,
      total: formState.values.total,
      fkidproveedor: formState.values.fkidproveedor,
      insumos: compraDetalle,
    };
    console.log(body);
    try {
      const rsp = await RequestServer.POST(
        "http://localhost:8000/api/web/compras",
        body
      );
      showSnack(rsp.data.message, "success");
      history.goBack();
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  const onClickDeleteItem = (index) => {
    let newArr = [...compraDetalle]; // copying the old datas array
    newArr.splice(index, 1);
    setCompraDetalle(newArr);
    setTotal(newArr);
  };

  const setTotal = (detalle) => {
    let total = detalle.reduce((ac, cur) => {
      return ac + cur.precio * cur.cantidad;
    }, 0);
    let event = {
      target: {},
      persist: () => {},
    };
    event.target.name = "total";
    event.target.value = Math.round(total * 100) / 100 + "";
    handleChange(event);
  };
  const onClickAdd = () => {
    const insumo = formStateDetalle.values.id;
    if (compraDetalle.find((detalle) => detalle.id === insumo))
      return showSnack("Ya existe el Insumo!!", "error");

    let newDetalles = [...compraDetalle, { ...formStateDetalle.values }];
    setCompraDetalle(newDetalles);
    reset(initialValues);
    setTotal(newDetalles);
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
      {/* <Grid container spacing={2} direction="row" style={{ marginBottom: 10 }}>
        <Grid item md={4} spacing={2}>
          <Paper className={className.sizeGrid}>
            <h1>PRIMER CUADRANTE</h1>
          </Paper>
        </Grid>
        <Grid item md={8}>
          <Paper className={className.sizeGrid}>
            <Grid container justify="center" style={{ padding: 8 }}>
              <Typography variant="h4">INSUMOS</Typography>
            </Grid>
            <Grid container direction="row">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((data) => (
                <Grid item md={3}>
                  <CardView />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>*/}
      <Card>
        <CardHeader title="REGISTRO DE COMPRA" />
        <CardContent>
          <Grid container spacing={1}>
            {Object.keys(formSchema).map((key) => (
              <Grid item md={6} sm={6} xs={12}>
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
              />
            </Grid>
          </Grid>
          {compraDetalle.length > 0 ? (
            <>
              <Divider />
              <Grid container style={{ margin: 10 }}>
                <Typography variant="h5">RESUMEN DE COMPRA</Typography>
              </Grid>
            </>
          ) : null}
          <List className={className.lista}>
            {compraDetalle.map(({ id, precio, cantidad }, index) => (
              <div key={id}>
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
                        {findInsumo(id).nombre}
                      </Typography>
                      <Typography>{`Precio: ${precio} Bs.`}</Typography>
                      <Typography variant="caption">{`Cantidad: ${cantidad}`}</Typography>
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
      <Button
        color="primary"
        className={className.button}
        disabled={!formState.isValid || !(compraDetalle.length > 0)}
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

CompraCreate.propTypes = {
  history: PropTypes.object,
};

export default CompraCreate;
