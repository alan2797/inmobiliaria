const formSchema = {
  fecha_hora: {
    label: "Fecha y hora *",
    type: "datetime-local",
    shrink: true,
  },
  total: {
    label: "Total *",
    type: "numeric",
    readOnly: true,
  },
};

const formSchemaDetalle = {
  precio: {
    label: "precio *",
    type: "numeric",
  },
  cantidad: {
    label: "Cantidad *",
    type: "text",
  },
};
export {formSchema, formSchemaDetalle};
