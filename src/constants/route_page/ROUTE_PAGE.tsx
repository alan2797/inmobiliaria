const ROUTE_PAGE = {
  LOGIN: "/login",
  HOME: "/",
  INSUMO: {
    LISTAR: "/insumo",
    CREAR: "/insumo/crear",
    EDITAR: "/insumo/editar/:id",
  },
  INVITACION: {
    LISTAR: "/invitacion/listar",
    CREAR: "/invitacion/crear",
    EDITAR: "/invitacion/editar/:id",
    LISTAR_ACTIVIDAD: "/invitacion/actividad/:id",
    CREAR_ACTIVIDAD: "/invitacion/actividad/crear/:id",
    LISTAR_ESTADO: "/invitacion/estado/:id",
    CREAR_ESTADO: "/invitacion/estado/crear/:id",
    EDITAR_ESTADO: "/invitacion/estado/editar/:id",
    LISTAR_ALL: "/invitacion/all",
  },
  PRODUCTO: {
    LISTAR: "/producto/listar",
    CREAR: "/producto/crear",
  },
  PERSONAL: {
    LISTAR: "/personal/listar",
    CREAR: "/personal/crear",
  },
  ROL: {
    LISTAR: "/rol/listar",
    CREAR: "/rol/crear",
  },
  USUARIO: {
    LISTAR: "/usuario/listar",
    CREAR: "/usuario/crear",
  },
  FUNCIONALIDAD: {
    LISTAR: "/funcionalidad/listar",
    CREAR: "/funcionalidad/crear",
  },
  PRODUCCION: {
    LISTAR: "/produccion/listar",
    CREAR: "/produccion/crear",
  },
  VENTA: {
    LISTAR: "/venta/listar",
    CREAR: "/venta/crear",
  },
  PEDIDO: {
    LISTAR: "/pedido/listar",
    CREAR: "/pedido/crear",
    LISTAR_DETALLE: "/pedido/listar/detalle/:id",
    EDITAR_ESTADO: "/pedido/estado/editar/:id",
  },
  PROVEEDOR: {
    LISTAR: "/proveedor/listar",
    CREAR: "/proveedor/crear",
  },
  COMPRA: {
    LISTAR: "/compra/listar",
    CREAR: "/compra/crear",
  },
  PROPIETARIO: {
    LISTAR: "/propietario/listar",
    CREAR: "/propietario/crear",
  },
  INMUEBLE: {
    LISTAR: "/inmueble/listar",
    CREAR: "/inmueble/crear",
  },
  CONTRATO:{
    LISTAR: "/contrato/listar",
    CREAR: "/contrato/crear",

  }
};

const ROUTE_PARAM = (route, param, baseUrl = "") => {
  //Si el object esta vacio
  let isEmpty = (data) => {
    return Object.keys(data).length === 0;
  };
  //Si es un object
  let isObject = (data) => {
    return typeof data === "object" && data !== null && data !== undefined;
  };
  let copyUrl = route;
  if (isObject(param) && !isEmpty(param)) {
    Object.keys(param).forEach((key) => {
      copyUrl = copyUrl.replace(":" + key, param[key]);
    });
  }
  return baseUrl + copyUrl;
};
export { ROUTE_PAGE, ROUTE_PARAM };
