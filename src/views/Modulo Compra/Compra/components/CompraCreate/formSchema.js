const formSchema = {
  fecha_hora: {
    label: "Fecha y hora *",
    type: "datetime-local",
    shrink: true,
  },
  fkidproveedor: {
    label: "Proveedor *",
    //helperText: "texto de ayuda",
    type: "select",
    select: true,
    opciones: [],
  },
  total: {
    label: "Total *",
    helperText: "Total de la compra",
    type: "text",
  },
};

const formSchemaInsumo = {
  id: {
    label: "Insumo *",
    type: "select",
    select: true,
    opciones: [],
  },
  cantidad: {
    label: "Cantidad *",
    helperText: "Cantidad de insumo que se utilizara",
    type: "text",
  },
  precio: {
    label: "Precio *",
    helperText: "Precio unitario de insumo que se utilizara",
    type: "text",
  },
};
export { formSchema, formSchemaInsumo };
