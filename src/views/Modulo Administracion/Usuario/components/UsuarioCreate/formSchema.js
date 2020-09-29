const formSchema = {
  email: {
    label: "Correo *",
    type: "email",
  },
  password: {
    label: "Contraseña *",
    type: "text",
  },
  idpersonal: {
    label: "Personal *",
    type: "select",
    helperText: "Personal de la panaderia que aun no tiene acceso al sistema",
    select: true,
    opciones: [],
  },
};
export default formSchema;
