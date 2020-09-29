const formSchema = {
  fecha_hora: {
    label: "Fecha y hora *",
    type: "datetime-local",
    shrink: true,
  },
  producto: {
    label: "Producto *",
    //helperText: "texto de ayuda",
    type: "select",
    select: true,
    opciones: [],
  },
  cantidad: {
    label: "Cantidad *",
    //helperText: "texto de ayuda",
    type: "text",
  },
};

const formSchemaInsumo = {
  insumo: {
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
};

const formSchemaPersonal = {
  personal: {
    label: "Personal *",
    type: "select",
    select: true,
    opciones: [],
    helperText: "Personal encargado de la produccion",
  },
};
export { formSchema, formSchemaInsumo, formSchemaPersonal };
