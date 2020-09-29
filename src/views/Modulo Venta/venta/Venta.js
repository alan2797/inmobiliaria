import React, { useState, useEffect, useContext } from "react";
import { Box } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { isToolbarPresent } from "components/Table";
import MessageContext from "context/messageContext";
import { API, DELETE, EDIT, ROUTE_PAGE, ROUTE_PARAM } from "constants/index";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import {getUrlImage} from 'utils/getUrlImage';
import { EnhancedTable } from "components";
import useConfirmDialog from "hooks/useConfirmDialog";
import { RequestServer } from "service/RequestServer";
import { headCells } from "./configTable";
import { Toolbar } from "./components";

const Venta = ({ history }) => {
  const [insumos, setData] = useState(null);
  const { showSnack } = useContext(MessageContext);
  const [ConfirmDialog, showDialog, closeDialog] = useConfirmDialog(
    "Eliminar",
    "Esta seguro de eliminarlo?"
  );

  const fetchData = async () => {
    try {
      const result = await RequestServer.GET(API.VENTA.LISTAR);
      setData(result.data.data);
    } catch (error) {
      console.log("fetchData", error);
      showSnack(error.message, error.type);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toolBar = [
    {
      icon: EditIcon,
      title: EDIT,
      color: "primary",
      onClick: (ids) =>
        history.push(ROUTE_PARAM(ROUTE_PAGE.INSUMO.EDITAR, { id: ids[0] })),
      disabled: (ids) => false,
      show: (ids) => ids.length === 1,
      privilegio: true,
    },
    {
      icon: DeleteIcon,
      title: DELETE,
      color: "primary",
      onClick: (ids) => showDialog(ids),
      disabled: (ids) => false,
      show: (ids) => ids.length > 0,
      privilegio: true,
    },
    {
      icon: FilterListIcon,
      title: "filtrar",
      color: "primary",
      onClick: (ids) => console.log("editar", ids),
      disabled: (ids) => ids.length === 0,
      show: (ids) => ids.length > 0,
      privilegio: true,
    },
  ];

  const eliminarProducto = async (data) => {
    console.log("[venta] id", data);
    try {
      const result = await RequestServer.DELETE(
        ROUTE_PARAM(API.VENTA.EDIT, { id: data })
      );
      showSnack(result.data.message, "success");
      fetchData();
    } catch (error) {
      showSnack(error.message, error.type);
    }
    closeDialog();
  };

  const formatDateTime = (item) => {
      const timeStamp = new Date(item);
      return (
        timeStamp.toLocaleDateString() +
        "  " +
        timeStamp.toLocaleTimeString()
      );
  }

  return (
    <Box p={3}>
      <Toolbar />
      <Box mt={2}>
        <EnhancedTable
          headTable={headCells}
          rowIdName={"idventa"}
          dataTable={insumos}
          titleTable={"Lista de ventas"}
          toolBarPresent={isToolbarPresent(toolBar)}
          toolBar={toolBar}
          transformColumn={{
            fecha_hora: (item) => formatDateTime(item),
            cliente: (item) => item.nombre,
            created_at: (item) => formatDateTime(item)
          }}
          reloadCallback={() => {
            setData(null);
            setTimeout(fetchData, 1000);
          }}
        ></EnhancedTable>
      </Box>
      <ConfirmDialog onConfirm={(data) => eliminarProducto(data)} />
    </Box>
  );
};

export default Venta;
