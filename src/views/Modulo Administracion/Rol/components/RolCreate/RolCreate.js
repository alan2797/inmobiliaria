import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Card, CardContent, CardHeader } from "@material-ui/core";
import { SAVE, BACK, API } from "constants/index";
import { FormInput, Button } from "components";
import useForm from "hooks/useForm.js";
import { RequestServer } from "service/RequestServer";
import MessageContext from "context/messageContext";
import formSchema from "./formSchema";
import { schema as schemaValidate } from "./Schema.js";
import Switch from "@material-ui/core/Switch";
import { useStyles } from "../../style/style";
import SortableTree, {
  getFlatDataFromTree,
  getTreeFromFlatData,
} from "react-sortable-tree";
import "react-sortable-tree/style.css"; // This only needs to be imported once in your app
const treeData = [
  {
    id: 1,
    nombre: "Usuario",
    tipo: "FUNCIONALIDAD",
    visible: true,
    parentNode: null,
    children: [
      { id: 2, nombre: "Nuevo", tipo: "BOTON", visible: false, parentNode: 1 },

      { id: 4, nombre: "Ver", tipo: "BOTON", visible: true, parentNode: 1 },
      {
        id: 5,
        nombre: "Eliminar",
        tipo: "BOTON",
        visible: true,
        parentNode: 1,
      },
      { id: 6, nombre: "Editar", tipo: "BOTON", visible: false, parentNode: 1 },
    ],
  },
  {
    id: 7,
    nombre: "Rol",
    tipo: "FUNCIONALIDAD",
    visible: false,
    parentNode: null,
    children: [
      { id: 8, nombre: "Nuevo2", tipo: "BOTON", visible: true, parentNode: 7 },
    ],
  },
  {
    id: 9,
    nombre: "Personal",
    tipo: "FUNCIONALIDAD",
    visible: true,
    parentNode: null,
    children: [
      { id: 10, nombre: "Nuevo3", tipo: "BOTON", visible: true, parentNode: 9 },
    ],
  },
  {
    id: 11,
    nombre: "Funcionalidad",
    tipo: "FUNCIONALIDAD",
    visible: true,
    parentNode: null,
    children: [
      {
        id: 12,
        nombre: "Nuevo4",
        tipo: "BOTON",
        visible: true,
        parentNode: 11,
      },
    ],
  },
];
const PersonalCreate = (props) => {
  const { history } = props;
  const className = useStyles();
  const [formState, handleChange, hasError] = useForm(schemaValidate);
  const { showSnack } = useContext(MessageContext);
  const [tree, setTree] = useState(treeData);

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

  const handleSubmit = () => {
    console.log(formState.values);
    console.log(tree);
    const flatData = getFlatDataFromTree({
      treeData: tree,
      getNodeKey: (node) => node.id,
    });

    const testData = [
      { id: 1, title: "Chicken", parent: null },
      { id: 2, title: "Egg", parent: 1 },
    ];
    const tData = getTreeFromFlatData({
      flatData: testData,
      getKey: (node) => node.id,
      getParentKey: (node) => node.parent,
      rootKey: null,
    });
    console.log(flatData);
    console.log(tData);
    const flatDataPrueba = getFlatDataFromTree({
      treeData: tData,
      getNodeKey: (node) => node.id,
    });
    console.log(flatDataPrueba);
    /*try {
      const rsp = await RequestServer.POST(
        "http://localhost:8000/api/web/roles",
        formState.values
      );

      showSnack(rsp.data.message, "success");
      history.goBack();
    } catch (error) {
      showSnack(error.message, error.type);
    }*/
  };
  const handleChangeSwitch = (nodo, path) => {
    console.log(nodo);
    console.log(path);
  };
  return (
    <div className={className.root}>
      <Card className={className.root}>
        <CardHeader title="Registro de Rol" />
        <CardContent>
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
            />
          ))}

          <div style={{ height: 400 }}>
            <SortableTree
              treeData={tree}
              onChange={(treeData) => setTree(treeData)}
              canDrag={false}
              getNodeKey={({ node }) => node.id}
              generateNodeProps={({ node, path }) => ({
                title: (
                  <>
                    <h4>{node.nombre}</h4>
                  </>
                ),
                subtitle: node.tipo,
                buttons: [
                  <>
                    <Switch
                      checked={node.visible}
                      onChange={() => handleChangeSwitch(node, path)}
                      name="checkedA"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </>,
                ],
              })}
            />
          </div>
          <Button
            color="primary"
            className={className.button}
            disabled={!formState.isValid}
            size="large"
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
          />
        </CardContent>
      </Card>
    </div>
  );
};

PersonalCreate.propTypes = {
  history: PropTypes.object,
};

export default PersonalCreate;
