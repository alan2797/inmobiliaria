import React from "react";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import ShopIcon from "@material-ui/icons/Shop";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { Dashboard } from "../../views";
const package = [
  {
    title: "Dashboard",
    href: "/",
    icon: <DashboardIcon />,
    component: Dashboard,
  },
  {
    title: "Administración",
    icon: <AccountBoxIcon />,
    children: [],
  },
  {
    title: "Produccion",
    icon: <ShopIcon />,
    children: [],
  },
  {
    title: "Compra",
    icon: <AddShoppingCartIcon />,
    children: [],
  },
  {
    title: "Venta",
    icon: <ShoppingCartIcon />,
    children: [],
  },
];

export { package };
