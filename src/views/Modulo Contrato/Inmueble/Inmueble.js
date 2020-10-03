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
import { simpleStorageAbi } from "./abi";

const Propietario = ({ history }) => {
  const className = useStyles();
  const [inmuebles, setData] = useState([]);
  const { showSnack } = useContext(MessageContext);
  const [ConfirmDialog, showDialog, closeDialog] = useConfirmDialog(
    "Eliminar",
    "Esta seguro de eliminarlo?"
  );
  const [number, setNumber] = useState(0);
  const [getNumber, setGetNumber] = useState("0x00");
  const web3 = new Web3("http://127.0.0.1:7545");
  const contractAddr = "0x995f9d2e829e2c4f08AECF7F2B553230e7d1287D";

  const SimpleContract = new web3.eth.Contract(simpleStorageAbi, contractAddr);
  const fetchData = async () => {
    try {
      const result = await RequestServer.GET(
        "http://localhost:5000/api/inmueble"
      );
      console.log(result);
      setData(result.data.data);
    } catch (error) {
      console.log("fetchData", error);
      showSnack(error.message, error.type);
    }

    const accounts1 = await web3.eth.getAccounts();
    console.log(web3);
    console.log(accounts1);
    console.log("adrees , ", accounts1[0]);

    // contract address is provided by Truffle migration

    const result = await SimpleContract.methods.get().call();
    setGetNumber(result);
    console.log(result);

    const accounts = await window.ethereum.enable();
    console.log(",otra manera , ", accounts);
    const account = accounts[0];
    const gas = await SimpleContract.methods.set(1500).estimateGas();
    console.log("gas ", gas);
    const result2 = await SimpleContract.methods.set(1500).send({
      from: account,
      gas,
    });
    console.log("result de seterar ", result2);
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
          dataTable={inmuebles}
          titleTable={"Lista de Inmuebles"}
          toolBarPresent={isToolbarPresent(toolBar)}
          toolBar={toolBar}
          transformColumn={{
            ubicacion: (item) => {
              return item.ciudad;
            },
            propietario: (item) => {
              return item.nombre + " " + item.apellido;
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

export default Propietario;
