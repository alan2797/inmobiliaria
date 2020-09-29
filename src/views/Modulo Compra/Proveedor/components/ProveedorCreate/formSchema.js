const formSchema = {
  nombre: {
    label: "Nombre *",
    type: "text",
  },
  apellido: {
    label: "Apellido *",
    //helperText: "texto de ayuda",
    type: "text",
  },
  telefono_celular: {
    label: "Telefono - Celular *",
    //helperText: "texto de ayuda",
    type: "text",
  },
  email: {
    label: "Correo *",
    type: "email",
  },
};

export { formSchema };
