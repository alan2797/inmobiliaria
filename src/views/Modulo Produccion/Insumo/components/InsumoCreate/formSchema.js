const formSchema = {
  nombre: {
    label: "Nombre *",
    type: "text",
  },
  costo: {
    label: "Costo *",
    //helperText: "texto de ayuda",
    type: "text",
  },
  stock: {
    label: "Stock *",
    type: "text",
  },
  stock_minimo: {
    label: "Stock minimo *",
    type: "text",
  },
  stock_maximo: {
    label: "Stock maximo *",
    type: "text",
  },
  fkidunidad_medida: {
    label: "Unidad Medida *",
    type: "select",
    select: true,
    opciones: [],
  },
};
export default formSchema;
