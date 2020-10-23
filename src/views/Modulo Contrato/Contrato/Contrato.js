import React, { useState, useEffect, useContext } from "react";
import { Box } from "@material-ui/core";
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
import { Toolbar } from "./components";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { useStyles } from "./style/style";
import Web3 from "web3";
import { abiContrato } from "./components/ContratoCreate/abi";

const Contrato = ({ history }) => {
  const className = useStyles();
  const [contratos, setData] = useState(null);
  const { showSnack } = useContext(MessageContext);
  const [ConfirmDialog, showDialog, closeDialog] = useConfirmDialog(
    "Eliminar",
    "Esta seguro de eliminarlo?"
  );

  const web3 = new Web3("http://127.0.0.1:7545");
  const contractAddr = "0x32b701a843188E4EAc5954caAF659404835f5006";

  const listaContratos = new web3.eth.Contract(abiContrato, contractAddr);
  const fetchData = async () => {
    const result = await listaContratos.methods.getContratos().call();
    console.log("get ", result);
    console.log(result.length);
    var array = [];
    for (let i = 0; i < result.length; i++) {
      let item = result[i];
      let data = {
        id: i+1,
        fechaInicio: item.fecha_inicio,
        fechaFinal: item.fecha_final,
        tipo: item.tipo,
        valor: item.valor,
        moneda: item.moneda,
        tipoPago: item.tipo_pago,
        entregaPago: item.entrega_pago,
        estado: item.estado,
      };
      array.push(data);
      console.log(item);
    }
    setData(array);
    ///setear
    /*const accounts = await window.ethereum.enable();
    console.log(",otra manera , ", accounts);
    const account = accounts[0];
    const gas = await listaContratos.methods
      .setContrato(
        "Alquiler",
        "2 años",
        500,
        "dolares",
        "12/10/2020",
        "12/10/2022",
        "Juana robles",
        1
      )
      .estimateGas();
    console.log("gas ", gas);
    const result2 = await listaContratos.methods
      .setContrato(
        "Alquiler",
        "2 años",
        500,
        "dolares",
        "12/10/2020",
        "12/10/2022",
        "Juana robles",
        1
      )
      .send({
        from: account,
        gas,
      });
    console.log("result de seterar ", result2);*/
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
          rowIdName={"id"}
          dataTable={contratos}
          titleTable={"Lista de Contratos"}
          toolBarPresent={isToolbarPresent(toolBar)}
          toolBar={toolBar}
          //transformColumn={{}}
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

export default Contrato;
