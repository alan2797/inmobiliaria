const formSchema = {
  username: {
    label: "Usuario *",
    type: "text",
  },
  password: {
    label: "Contraseña *",
    type: "text",
  },
  personalId: {
    label: "Personal *",
    type: "select",
    helperText:
      "Personal de la inmobiliaria que aun no tiene acceso al sistema",
    select: true,
    opciones: [],
  },
  rolId: {
    label: "Rol *",
    type: "select",
    helperText: "Rol que tendra en el sistema",
    select: true,
    opciones: [],
  },
};
export default formSchema;
