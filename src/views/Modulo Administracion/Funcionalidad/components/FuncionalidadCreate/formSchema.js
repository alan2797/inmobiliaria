const formSchema = {
  nombre: {
    label: "Nombre *",
    type: "text",
  },
  tipo: {
    label: "Tipo funcionalidad *",
    type: "select",
    opciones: [
      {
        id: "FUNCIONALIDAD",
        nombre: "FUNCIONALIDAD",
      },
      {
        id: "BOTON ",
        nombre: "BOTON",
      },
      {
        id: "INPUT",
        nombre: "INPUT",
      },
    ],
    select: true,
  },
  descripcion: {
    label: "Descripcion ",
    type: "text",
  },
  url: {
    label: "Url ",
    type: "text",
  },
};
export default formSchema;
