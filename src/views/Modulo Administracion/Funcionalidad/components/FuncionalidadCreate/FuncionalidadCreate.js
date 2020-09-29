import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { SAVE, BACK, API } from "constants/index";
import { FormInput, Button, Modal } from "components";
import useForm from "hooks/useForm.js";
import { RequestServer } from "service/RequestServer";
import MessageContext from "context/messageContext";
import formSchema from "./formSchema";
import { schema as schemaValidate } from "./Schema.js";
import Switch from "@material-ui/core/Switch";
import { useStyles } from "../../style/style";
import SortableTree from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
import { Add, AddBoxRounded } from "@material-ui/icons";
import { addNodeUnderParent } from "react-sortable-tree";
const treeData = [
  {
    id: 1,
    nombre: "Personal",
    tipo: "FUNCIONALIDAD",
    visible: true,
    children: [{ id: 2, nombre: "Nuevo3", visible: true, tipo: "BOTON NUEVO" }],
  },
];

const FuncionalidadCreate = (props) => {
  const { history } = props;
  const className = useStyles();
  const [formState, handleChange, hasError] = useForm(schemaValidate);
  const { showSnack } = useContext(MessageContext);
  const [tree, setTree] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [nodoInfo, setNodoInfo] = useState(null);
  const getTipoPersonal = async () => {
    /*try {
      const result = await RequestServer.GET(API.UNIDAD_MEDIDA.LISTAR);
      console.log(result.data);
      setUnidades(result.data.data);
    } catch (error) {
      showSnack(error.message, error.type);
    }*/
  };

  useEffect(() => {
    getTipoPersonal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formState.values);
    try {
      const rsp = await RequestServer.POST(
        "http://localhost:8000/api/web/roles",
        formState.values
      );

      showSnack(rsp.data.message, "success");
      history.goBack();
    } catch (error) {
      showSnack(error.message, error.type);
    }
  };

  const registrarNodo = () => {
    console.log(formState.values);
    console.log(nodoInfo);
    const NEW_NODE = {
      nombre: formState.values.nombre,
      tipo: formState.values.tipo,
      parentId: nodoInfo ? nodoInfo.nodo.id : null,
      needsTitle: true,
      expanded: true,
      children: [],
    };
    const newTree = addNodeUnderParent({
      treeData: tree,
      newNode: NEW_NODE,
      expandParent: true,
      parentKey: nodoInfo ? nodoInfo.treeIndex : undefined,
      getNodeKey: ({ treeIndex }) => treeIndex,
    });
    setTree(newTree.treeData);
    console.log(tree);
    setOpenModal(false);
    setNodoInfo(null);
  };

  const onClickAgregar = (nodo, path, treeIndex) => {
    setOpenModal(true);
    setNodoInfo({ nodo, path, treeIndex });
  };
  return (
    <div className={className.root}>
      <Card className={className.root} style={{ marginBottom: 10 }}>
        <CardHeader title="Crear Funcionalidades" />
        <CardContent>
          <Button
            color="primary"
            className={className.button}
            size="large"
            variant="contained"
            title={"Nuevo"}
            disabled={tree.length > 0}
            onClick={() => setOpenModal(true)}
          />
          <div style={{ height: 400 }}>
            <SortableTree
              treeData={tree}
              onChange={(treeData) => setTree(treeData)}
              canDrag={false}
              //  rowHeight={100}
              getNodeKey={({ node }) => node.id}
              innerStyle={{ padding: 15 }}
              generateNodeProps={({ node, path, treeIndex }) => ({
                title: (
                  <>
                    <h4>{node.nombre}</h4>
                  </>
                ),
                subtitle: node.tipo,
                buttons: [
                  <>
                    <Tooltip title={"AGREGAR MÁS"} placement="top" arrow>
                      <IconButton
                        color="primary"
                        aria-label="add"
                        onClick={() => onClickAgregar(node, path, treeIndex)}
                      >
                        <AddBoxRounded />
                      </IconButton>
                    </Tooltip>
                  </>,
                ],
              })}
            />
          </div>
        </CardContent>
      </Card>

      {/*<Button
        color="primary"
        className={className.button}
        disabled={!formState.isValid}
        size="large"
        type="submit"
        variant="contained"
        title={SAVE}
      />*/}

      <Button
        color="inherit"
        size="large"
        variant="contained"
        onClick={() => history.goBack()}
        title={BACK}
      />
      <Modal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        handleOk={registrarNodo}
        title="Registrar Funcionalidad"
        disabledOk={!formState.isValid}
      >
        <>
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
        </>
      </Modal>
    </div>
  );
};

FuncionalidadCreate.propTypes = {
  history: PropTypes.object,
};

export default FuncionalidadCreate;
