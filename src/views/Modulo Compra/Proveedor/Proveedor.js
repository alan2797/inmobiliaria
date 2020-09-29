import React, { useState, useEffect, useContext } from "react";
import { Box } from "@material-ui/core";
import FilterListIcon from "@material-ui/icons/FilterList";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { isToolbarPresent } from "components/Table";
import MessageContext from "context/messageContext";
import { DELETE, EDIT, ROUTE_PAGE, ROUTE_PARAM } from "constants/index";
import { EnhancedTable } from "components";
import useConfirmDialog from "hooks/useConfirmDialog";
import { RequestServer } from "service/RequestServer";
import { headCells } from "./configTable";
import { Toolbar } from "./components";
import { useStyles } from "./style/style";

const Proveedor = ({ history }) => {
  const className = useStyles();
  const [proveedores, setData] = useState([]);
  const { showSnack } = useContext(MessageContext);
  const [ConfirmDialog, showDialog, closeDialog] = useConfirmDialog(
    "Eliminar",
    "Esta seguro de eliminarlo?"
  );

  const fetchData = async () => {
    try {
      const result = await RequestServer.GET(
        "http://localhost:8000/api/web/proveedor"
      );

      setData(result.data.data);
      console.log(result.data);
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

  const eliminarPersona = async (data) => {
    console.log("[insumo] id", data);
    // try {
    //   const result = await RequestServer.DELETE(
    //     ROUTE_PARAM(API.PERSONA.EDIT, { id: data })
    //   );
    //   showSnack(result.data.message, "success");
    //   fetchData();
    // } catch (error) {
    //   showSnack(error.message, error.type);
    // }
    closeDialog();
  };

  return (
    <Box p={3}>
      <Toolbar />
      <Box mt={2}>
        <EnhancedTable
          headTable={headCells}
          rowIdName={"idproveedor"}
          dataTable={proveedores}
          titleTable={"Lista de Proveedores"}
          toolBarPresent={isToolbarPresent(toolBar)}
          toolBar={toolBar}
          transformColumn={{
            created_at: (item) => {
              if (item == null) {
                return "";
              } else {
                const timeStamp = new Date(item);
                return (
                  timeStamp.toLocaleDateString() +
                  "  " +
                  timeStamp.toLocaleTimeString()
                );
              }
            },
          }}
          reloadCallback={() => {
            //setData(null);
            setTimeout(fetchData, 1000);
          }}
        ></EnhancedTable>
      </Box>
      <ConfirmDialog onConfirm={(data) => eliminarPersona(data)} />
    </Box>
  );
};

export default Proveedor;
