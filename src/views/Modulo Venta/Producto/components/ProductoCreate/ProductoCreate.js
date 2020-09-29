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
} from "@material-ui/core";
import { SAVE, BACK, API } from "constants/index";
import { FormInput } from "components";
import useForm from "hooks/useForm.js";
import { RequestServer } from "service/RequestServer";
import MessageContext from "context/messageContext";
import Picker from "components/Form/Picker.js";
import formSchema from "./formSchema";
import { schema as schemaValidate } from "./Schema.js";
import { useStyles } from "../../style/style";
import { categoriaData } from "./data";

const ProductoCreate = (props) => {
  const { history } = props;
  const className = useStyles();
  const [categoria, setCategoria] = useState(null);
  const [categorias, setCategorias] = useState(categoriaData);
  const [openCategoria, setOpenCategoria] = useState(false);
  const [formState, handleChange, hasError] = useForm(schemaValidate);
  const { showSnack } = useContext(MessageContext);

  const getCategorias = async () => {
    try {
      const result = await RequestServer.GET(API.CATEGORIA.LISTAR);
      setCategorias(result.data.data);
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };


  useEffect(() => {
    getCategorias();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    formState.values.fkidcategoria = categoria.idcategoria;
    console.log(formState.values);
    const form = parseFormData(formState.values);
    try {
      const rsp = await RequestServer.POST(API.PRODUCTO.LISTAR, form);
      showSnack(rsp.data.message, "success");
      history.goBack();
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  const handleCloseCategoria = () => {
    setOpenCategoria(false);
  };

  const selectCategoria = (data) => {
    handleCloseCategoria();
    setCategoria(data);
  };

  const parseFormData =(data) => {
    const form = new FormData();
    Object.keys(data).forEach(key => {
      form.append(key, data[key]);
    });
    return form;
  }

  return (
    <div className={className.root}>
      <Card className={className.root}>
        <CardHeader title="Registro de Producto" />
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
              />
            ))}
            <Box mb={2}>
              <Typography>Categoria</Typography>
              <Button onClick={() => setOpenCategoria(true)}>
                {categoria ? categoria.nombre : "Seleccione"}
              </Button>
            </Box>

            <Button
              color="primary"
              className={className.button}
              disabled={!formState.isValid || !categoria}
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
        open={openCategoria}
        handleClose={handleCloseCategoria}
        data={categorias}
        titulo="Seleccione la categoria"
        label="Nombre"
        searchIn={["nombre"]}
        keysParam={{
          titulo: { keys: ["nombre"] },
        }}
        selectItem={selectCategoria}
      />
    </div>
  );
};

ProductoCreate.propTypes = {
  history: PropTypes.object,
};

export default ProductoCreate;
