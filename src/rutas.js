import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { ROUTE_PAGE } from "constants/index";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import ShopIcon from "@material-ui/icons/Shop";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import LocalMallIcon from "@material-ui/icons/LocalMall";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import {
  InsumoView,
  ProductoView,
  PersonalView,
  RolView,
  UsuarioView,
  Dashboard,
  FichaProduccionView,
  VentaView,
  PedidoView,
  ProveedorView,
  CompraView,
  FuncionalidadView,
  PropietarioView,
  InmuebleView,
  ContratoView,
} from "./views";
import { InsumoCreateView } from "views/Modulo Produccion/Insumo/components";
import { ProductoCreateView } from "views/Modulo Venta/Producto/components";
import { PersonalCreateView } from "views/Modulo Administracion/Personal/components";
import { RolCreateView } from "views/Modulo Administracion/Rol/components";
import { UsuarioCreateView } from "views/Modulo Administracion/Usuario/components";
import { ProveedorCreateView } from "views/Modulo Compra/Proveedor/components";
import { CompraCreateView } from "views/Modulo Compra/Compra/components";
import { FichaProduccionCreateView } from "views/Modulo Produccion/FichaProduccion/components";
import { VentaCreateView } from "views/Modulo Venta/venta/components";
import {
  PedidoDetalleView,
  PedidoEditEstadoView,
} from "views/Modulo Venta/pedido/components";
import { FuncionalidadCreateView } from "views/Modulo Administracion/Funcionalidad/components";
/////////contrto
import { PropietarioCreateView } from "views/Modulo Contrato/Propietario/components";
import { InmuebleCreateView } from "views/Modulo Contrato/Inmueble/components";
import { ContratoCreateView } from "views/Modulo Contrato/Contrato/components";
import {
  KEY_PERSONAL,
  KEY_ROL,
  KEY_USUARIO,
  KEY_FUNCIONALIDADES,
  KEY_DASHBOARD,
  KEY_CLIENTE,
  KEY_PROPIETARIO,
  KEY_INMUEBLES,
  KEY_CONTRATOS,
} from "permisos";
export const pages = [
  {
    id: KEY_DASHBOARD,
    title: "Dashboard",
    href: "/",
    icon: <DashboardIcon />,
    component: Dashboard,
  },
  {
    title: "Administración",
    icon: <AccountBoxIcon />,
    children: [
      {
        id: KEY_PERSONAL,
        title: "Personal",
        href: ROUTE_PAGE.PERSONAL.LISTAR,
        icon: <AccountBoxIcon />,
        component: PersonalView,
        route: [
          {
            href: ROUTE_PAGE.PERSONAL.CREAR,
            component: PersonalCreateView,
          },
        ],
      },
      {
        id: KEY_ROL,
        title: "Rol - Privilegios",
        href: ROUTE_PAGE.ROL.LISTAR,
        icon: <AccountBoxIcon />,
        component: RolView,
        route: [
          {
            href: ROUTE_PAGE.ROL.CREAR,
            component: RolCreateView,
          },
        ],
      },
      {
        id: KEY_USUARIO,
        title: "Usuario",
        href: ROUTE_PAGE.USUARIO.LISTAR,
        icon: <AccountBoxIcon />,
        component: UsuarioView,
        route: [
          {
            href: ROUTE_PAGE.USUARIO.CREAR,
            component: UsuarioCreateView,
          },
        ],
      },
      {
        id: KEY_FUNCIONALIDADES,
        title: "Funcionalidades",
        href: ROUTE_PAGE.FUNCIONALIDAD.LISTAR,
        icon: <AccountBoxIcon />,
        component: FuncionalidadView,
        route: [
          {
            href: ROUTE_PAGE.FUNCIONALIDAD.CREAR,
            component: FuncionalidadCreateView,
          },
        ],
      },
    ],
  },
  {
    title: "Contratos",
    icon: <AccountBoxIcon />,
    children: [
      {
        id: KEY_PROPIETARIO,
        title: "Propietario",
        href: ROUTE_PAGE.PROPIETARIO.LISTAR,
        icon: <AccountBoxIcon />,
        component: PropietarioView,
        route: [
          {
            href: ROUTE_PAGE.PROPIETARIO.CREAR,
            component: PropietarioCreateView,
          },
        ],
      },
      {
        id: KEY_INMUEBLES,
        title: "Inmueble",
        href: ROUTE_PAGE.INMUEBLE.LISTAR,
        icon: <AccountBoxIcon />,
        component: InmuebleView,
        route: [
          {
            href: ROUTE_PAGE.INMUEBLE.CREAR,
            component: InmuebleCreateView,
          },
        ],
      },
      {
        id: KEY_CONTRATOS,
        title: "Contratos Blockchain",
        href: ROUTE_PAGE.CONTRATO.LISTAR,
        icon: <AccountBoxIcon />,
        component: ContratoView,
        route: [
          {
            href: ROUTE_PAGE.CONTRATO.CREAR,
            component: ContratoCreateView,
          },
        ],
      },
    ],
  },
  /* {
    title: "Produccion",
    icon: <ShopIcon />,
    children: [
      {
        id: KEY_PRODUCCION,
        title: "Ficha produccion",
        href: ROUTE_PAGE.PRODUCCION.LISTAR,
        icon: <AccountBoxIcon />,
        component: FichaProduccionView,
        route: [
          {
            href: ROUTE_PAGE.PRODUCCION.CREAR,
            component: FichaProduccionCreateView,
          },
        ],
      },
      {
        id: KEY_INSUMO,
        title: "Insumo",
        href: ROUTE_PAGE.INSUMO.LISTAR,
        icon: <AccountBoxIcon />,
        component: InsumoView,
        route: [
          {
            href: ROUTE_PAGE.INSUMO.CREAR,
            component: InsumoCreateView,
          },
        ],
      },
    ],
  },
  {
    title: "Compra",
    icon: <AddShoppingCartIcon />,
    children: [
      {
        id: KEY_PROVEEDOR,
        title: "Proveedor",
        href: ROUTE_PAGE.PROVEEDOR.LISTAR,
        icon: <AssignmentIndIcon />,
        component: ProveedorView,
        route: [
          {
            href: ROUTE_PAGE.PROVEEDOR.CREAR,
            component: ProveedorCreateView,
          },
        ],
      },
      {
        id: KEY_COMPRA,
        title: "Compra",
        href: ROUTE_PAGE.COMPRA.LISTAR,
        icon: <AssignmentIndIcon />,
        component: CompraView,
        route: [
          {
            href: ROUTE_PAGE.COMPRA.CREAR,
            component: CompraCreateView,
          },
        ],
      },
    ],
  },
  {
    title: "Venta",
    icon: <ShoppingCartIcon />,
    children: [
      {
        id: KEY_CLIENTE,
        title: "Cliente",
        href: ROUTE_PAGE.PRODUCTO.LISTAR,
        icon: <AssignmentIndIcon />,
        component: ProductoView,
        route: [
          {
            href: ROUTE_PAGE.PRODUCTO.CREAR,
            component: ProductoCreateView,
          },
        ],
      },
      {
        id: KEY_PRODUCTO,
        title: "Producto",
        href: ROUTE_PAGE.PRODUCTO.LISTAR,
        icon: <LocalMallIcon />,
        component: ProductoView,
        route: [
          {
            href: ROUTE_PAGE.PRODUCTO.CREAR,
            component: ProductoCreateView,
          },
        ],
      },
      {
        id: KEY_VENTA,
        title: "Venta",
        href: ROUTE_PAGE.VENTA.LISTAR,
        icon: <ShoppingBasketIcon />,
        component: VentaView,
        route: [
          {
            href: ROUTE_PAGE.VENTA.CREAR,
            component: VentaCreateView,
          },
        ],
      },
      {
        id: KEY_PEDIDO,
        title: "Pedido",
        href: ROUTE_PAGE.PEDIDO.LISTAR,
        icon: <AddShoppingCartIcon />,
        component: PedidoView,
        route: [
          {
            href: ROUTE_PAGE.PEDIDO.LISTAR_DETALLE,
            component: PedidoDetalleView,
          },
          {
            href: ROUTE_PAGE.PEDIDO.EDITAR_ESTADO,
            component: PedidoEditEstadoView,
          },
        ],
      },
    ],
  },*/
];
