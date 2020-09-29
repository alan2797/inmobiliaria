import React, { useState, useEffect, useContext } from "react";
import { Box } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";
import { isToolbarPresent } from "components/Table";
import MessageContext from "context/messageContext";
import { API, DELETE, EDIT, ROUTE_PAGE, ROUTE_PARAM } from "constants/index";
import { EnhancedTable } from "components";
import useConfirmDialog from "hooks/useConfirmDialog";
import { RequestServer } from "service/RequestServer";
import { headCells } from "./configTable";
import { Toolbar } from "./components";

const Pedido = ({ history }) => {
  const [pedidos, setData] = useState(null);
  const { showSnack } = useContext(MessageContext);
  const [ConfirmDialog, showDialog, closeDialog] = useConfirmDialog(
    "Eliminar",
    "Esta seguro de eliminarlo?"
  );

  const fetchData = async () => {
    try {
      const result = await RequestServer.GET(API.PEDIDO.LISTAR);
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
      icon: InfoIcon,
      title: 'mostrar detalle pedido',
      color: "primary",
      onClick: (ids) =>
        history.push(ROUTE_PARAM(ROUTE_PAGE.PEDIDO.LISTAR_DETALLE, { id: ids[0] })),
      disabled: (ids) => false,
      show: (ids) => ids.length > 0,
      privilegio: true,
    },
    {
      icon: EditIcon,
      title: 'Editar estado',
      color: "primary",
      onClick: (ids) =>
        history.push(ROUTE_PARAM(ROUTE_PAGE.PEDIDO.EDITAR_ESTADO, { id: ids[0] })),
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
    console.log("[pedido] id", data);
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

  const formatDate = (item) => {
    const timeStamp = new Date(item);
    return timeStamp.toLocaleDateString();
  }

  return (
    <Box p={3}>
      <Toolbar />
      <Box mt={2}>
        <EnhancedTable
          headTable={headCells}
          rowIdName={"idpedido"}
          dataTable={pedidos}
          titleTable={"Lista de pedidos"}
          toolBarPresent={isToolbarPresent(toolBar)}
          toolBar={toolBar}
          transformColumn={{
            fecha: (item) => formatDate(item),
            created_at: (item) => formatDateTime(item),
            observacion: (item) => item == null?'No registrado': item,
            cliente: (item) => item.nombre + ' ' + item.apellido,
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

export default Pedido;
