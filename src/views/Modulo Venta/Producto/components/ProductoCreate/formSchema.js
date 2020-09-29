const formSchema = {
  nombre: {
    label: "Nombre *",
    type: "text",
  },
  descripcion: {
    label: "Descripcion ",
    type: "text",
  },
  precio: {
    label: "Precio *",
    type: "numeric",
  },
  foto: {
    label: "Foto *",
    type: "file",
    shrink: true
  },
};
export default formSchema;
