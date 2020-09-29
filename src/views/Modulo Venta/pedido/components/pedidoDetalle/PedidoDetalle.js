import React, { useState, useEffect, useContext } from "react";
import { Box, Typography, CardContent, Card } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { isToolbarPresent } from "components/Table";
import MessageContext from "context/messageContext";
import { API, DELETE, EDIT, ROUTE_PAGE, ROUTE_PARAM } from "constants/index";
import { EnhancedTable } from "components";
import useConfirmDialog from "hooks/useConfirmDialog";
import { RequestServer } from "service/RequestServer";
import { headCells } from "./configTable";
import  Toolbar from "./Toolbar";
import { useParams } from "react-router-dom";

const PedidoDetalle = ({ history }) => {
  const [pedidos, setData] = useState(null);
  const { showSnack } = useContext(MessageContext);
  const { id } = useParams();
  const [ConfirmDialog, showDialog, closeDialog] = useConfirmDialog(
    "Eliminar",
    "Esta seguro de eliminarlo?"
  );

  const fetchData = async () => {
    try {
      const result = await RequestServer.GET(ROUTE_PARAM(API.PEDIDO.EDIT, { id }));
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

  const formatDate = (item) => {
    const timeStamp = new Date(item);
    return timeStamp.toLocaleDateString();
  }

  return (
    <Box p={3}>
      <Toolbar />
      {
        pedidos && <Card>
          <CardContent>
            <Box mb={1}>
              <Typography component="span" variant="h5">Cliente: </Typography>
              <Typography component="span" >{pedidos.cliente.nombre + ' ' + pedidos.cliente.apellido}</Typography>
            </Box>
            <Box mb={1}>
              <Typography component="span" variant="h5">Total: </Typography>
              <Typography component="span" >Bs. {pedidos.total}</Typography>
            </Box>
            <Box mb={1}>
              <Typography component="span" variant="h5">Fecha: </Typography>
              <Typography component="span" >{formatDate(pedidos.fecha)}</Typography>
            </Box>
            <Box>
              <Typography component="span" variant="h5">hora: </Typography>
              <Typography component="span" >{pedidos.hora}</Typography>
            </Box>
          </CardContent>
        </Card>
      }
      <Box mt={2}>
        <EnhancedTable
          headTable={headCells}
          rowIdName={"idpedido"}
          dataTable={pedidos?.detalles}
          titleTable={"Lista de detalle pedido"}
          toolBarPresent={isToolbarPresent(toolBar)}
          toolBar={toolBar}
          transformColumn={{
            producto: (item) => item.nombre,
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

export default PedidoDetalle;
