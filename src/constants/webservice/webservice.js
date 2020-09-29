const HOST = process.env.REACT_APP_URL_BASE;
// const HOST = "http://localhost:8000/api/web";
const API = {
  LOGIN: HOST + "/login",
  LOGOUT: HOST + "/logout",
  //INFOPERSONAL: HOST + "/persona/informacion",
  INSUMO: {
    LISTAR: HOST + "/insumo",
    EDIT: HOST + "/insumo/:id",
  },
  UNIDAD_MEDIDA: {
    LISTAR: HOST + "/unidad",
    EDIT: HOST + "/unidad/:id",
  },
  /* PERSONA: {
    LISTAR: HOST + "/person",
    EDIT: HOST + "/person/:id",
    LISTAR_ACTIVO: HOST + "/lista/person_active",
    LISTAR_SIN_ESTADO: HOST + "/lista/personas_nuevas",
    PADRE: HOST + "/lista/person_padre/:id",
    LISTA_SIN_ESTADO_PADRE: HOST + "/lista/personas_nuevas/:id",
  },
  DETALLE_ACTIVIDAD: {
    EDIT: HOST + "/detalle_actividad/:id",
    LISTAR: HOST + "/detalle_actividad",
    LISTAR_ASISTIDOS: HOST + "/lista/personas_asistidos/:id",
  },*/

  PERSONAL: {
    LISTAR: HOST + "/web/personal",
  },
  PRODUCTO: {
    LISTAR: HOST + "/web/producto",
    EDIT: HOST + "/web/producto/:id",
  },
  CATEGORIA: {
    LISTAR: HOST + "/web/categoria",
    EDIT: HOST + "/web/categoria/:id",
  },
  VENTA: {
    LISTAR: HOST + "/web/venta",
    EDIT: HOST + "/web/venta/:id",
  },
  CLIENTE: {
    LISTAR: HOST + "/web/cliente",
    EDIT: HOST + "/web/cliente/:id",
  },
  PEDIDO: {
    LISTAR: HOST + "/web/pedido",
    EDIT: HOST + "/web/pedido/:id",
  },
  ROL: {
    LISTAR: HOST + "roles",
  },
};
export { API, HOST };
