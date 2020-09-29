import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Box,
  Grid,
  List,
  ListItem,
  Avatar,
  IconButton,
  Divider,
  Chip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { SAVE, BACK, API } from "constants/index";
import { FormInput } from "components";
import useForm from "hooks/useForm.js";
import { RequestServer } from "service/RequestServer";
import MessageContext from "context/messageContext";
import Picker from "components/Form/Picker.js";
import {formSchema, formSchemaDetalle} from "./formSchema";
import { schema as schemaValidate, schemaDetalle as schemaValidateDetalle } from "./Schema.js";
import { useStyles } from "../../style/style";
// import { categoriaData } from "./data";
import { getUrlImage } from "utils";

const initialValues = {
  isValid: false,
  values: {},
  touched: {},
  errors: {},
};

const VentaCreate = (props) => {
  const { history } = props;
  const className = useStyles();
  const [cliente, setCliente] = useState(null);
  const [clientes, setClientes] = useState(null);
  const [openCliente, setOpenCliente] = useState(false);
  const [productos, setProductos] = useState(null);
  const [openProducto, setOpenProducto] = useState(false);
  const [producto, setProducto] = useState(null);
  const [formState, handleChange, hasError] = useForm(schemaValidate);
  const [formStateDetalle, handleChangeDetalle, hasErrorDetalle, reset] = useForm(schemaValidateDetalle);
  const { showSnack } = useContext(MessageContext);
  const [detalles, setDetalles] = useState([]);

  const getClientes = async () => {
    try {
      const result = await RequestServer.GET(API.CLIENTE.LISTAR);
      setClientes(result.data.data);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  const getProductos = async () => {
    try {
      const result = await RequestServer.GET(API.PRODUCTO.LISTAR);
      setProductos(result.data.data);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };


  useEffect(() => {
    getClientes();
    getProductos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    formState.values.fkidcliente = cliente.idcliente;
    formState.values.detalles = formatearDetalle(detalles);
    console.log(formState.values);
    try {
      const rsp = await RequestServer.POST(API.VENTA.LISTAR, formState.values);
      showSnack(rsp.data.message, "success");
      history.goBack();
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  const formatearDetalle = (detalles) => {
    return detalles.map(({producto, cantidad, precio}) => ({idproducto: producto.idproducto, cantidad, precio}))
  }

  const handleCloseCliente = () => {
    setOpenCliente(false);
  };

  const selectCliente = (data) => {
    handleCloseCliente();
    setCliente(data);
  };

  const handleCloseProducto = () => {
    setOpenProducto(false);
  };

  const selectItemProducto = (data) => {
    handleCloseProducto();
    initialValues.values.precio = data.precio;
    reset(initialValues);
    setProducto(data);
  };


  const parseFormData =(data) => {
    const form = new FormData();
    Object.keys(data).forEach(key => {
      form.append(key, data[key]);
    });
    return form;
  }

  const getTotal = (detalles) => {
    console.log(detalles);
    let total = detalles.reduce((ac, cur) => {
      return ac + (cur.precio * cur.cantidad); 
    }, 0);
    let event = {
      target: {},
      persist: () => {}
    };
    console.log(total);
    event.target.name = 'total';
    event.target.value = Math.round(total * 100) / 100 + '';
    handleChange(event);
  }

  const handleAgregarDetalle = async () => {
    if(detalles.find((detalle) => detalle.producto.idproducto === producto.idproducto)) 
      return showSnack('Ya existe el producto!!', 'error');
    initialValues.values.precio = null;
    reset(initialValues);
    setProducto(null);
    let newDetalles = [...detalles, {...formStateDetalle.values, producto: producto}];
    setDetalles(newDetalles);
    getTotal(newDetalles);
  }

  const deleteDetalleItem = ({idproducto}) => {
    const newDetalles = detalles.filter(({producto}) => producto.idproducto !== idproducto);
    setDetalles(newDetalles);
    getTotal(newDetalles);
  }

  return (
    <div className={className.root}>
      <Card className={className.root}>
        <CardHeader title="Registro de Venta" />
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
                readOnly={formSchema[key].readOnly}
              />
            ))}
            <Box mb={2}>
              <Typography>Cliente</Typography>
              <Button onClick={() => setOpenCliente(true)}>
                {cliente ? cliente.nombre : "Seleccione"}
              </Button>
            </Box>

            <Box mb={2}>
              <Typography>Productos</Typography>
              <Box>
                    <Grid container spacing={3} alignItems="center">
                      <Grid item md={3}>
                        <Button className={className.button}  onClick={() => setOpenProducto(true)}>
                          {producto ? producto.nombre : "Seleccione producto"}
                        </Button>
                      </Grid>
                      {Object.keys(formSchemaDetalle).map((key, index) => (
                        <Grid key={index} item md={3}>
                          <FormInput
                            key={key}
                            name={key}
                            label={formSchemaDetalle[key].label}
                            value={formStateDetalle.values[key]}
                            helperText={
                              hasErrorDetalle(key)
                                ? formStateDetalle.errors[key][0]
                                : formSchemaDetalle[key]?.helperText
                            }
                            error={hasErrorDetalle(key)}
                            onChange={handleChangeDetalle}
                            type={formSchemaDetalle[key].type}
                            shrink={formSchemaDetalle[key].shrink}
                            readOnly={formSchemaDetalle[key].readOnly}
                          />
                        </Grid>
                      ))} 
                      <Grid item md={3}>
                        <Button 
                          disabled={!formStateDetalle.isValid || !producto} 
                          variant="contained" 
                          color="primary" 
                          onClick={handleAgregarDetalle}
                          >
                          agregar
                        </Button>
                      </Grid>

                    </Grid>
              </Box>
            </Box>

            <List className={className.lista}>
              { detalles.map(({producto, precio, cantidad}) => (
               <div key={producto.idproducto}>
                  <ListItem>
                    <div className={className.cajaPadre}>
                      <Avatar className={className.fotoPadre}  src={getUrlImage(producto.foto)}/>
                      <Box display="flex" flexDirection="column" flex={1}>
                        <Typography variant="h5">{producto.nombre}</Typography>
                        <Typography>{`Bs. ${precio}`}</Typography>
                        <Typography variant="caption">{`Cantidad: ${cantidad}`}</Typography>
                      </Box>
                      <Chip className={className.button} color="primary" label={producto.categoria.nombre} />
                      <IconButton edge="end" aria-label="delete" onClick={() => deleteDetalleItem(producto)}>
                        <DeleteIcon />
                      </IconButton>
                    </div>
                  </ListItem>
                  <Divider variant="inset" component="li" />
               </div>
              ))}
            </List>

            <Button
              color="primary"
              className={className.button}
              disabled={!formState.isValid || !cliente || !detalles.length}
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
      <Picker
        open={openCliente}
        handleClose={handleCloseCliente}
        data={clientes}
        titulo="Seleccione el cliente"
        label="Nombre"
        searchIn={["nombre", 'apellido']}
        keysParam={{
          titulo: { keys: ["nombre", 'apellido'] },
          subtitulo: { keys: ['ci']}
        }}
        selectItem={selectCliente}
      />
      <Picker
        open={openProducto}
        handleClose={handleCloseProducto}
        data={productos}
        titulo="Seleccione el producto"
        label="Nombre"
        searchIn={["nombre"]}
        keysParam={{
          titulo: { keys: ["nombre"] },
          subtitulo: { keys: ['precio']}
        }}
        selectItem={selectItemProducto}
      />
    </div>
  );
};

VentaCreate.propTypes = {
  history: PropTypes.object,
};

export default VentaCreate;
