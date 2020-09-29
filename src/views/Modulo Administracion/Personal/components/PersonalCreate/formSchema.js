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
  ci: {
    label: "Carnet de Identidad *",
    //helperText: "texto de ayuda",
    type: "text",
  },
  telefono: {
    label: "Telefono - Celular *",
    //helperText: "texto de ayuda",
    type: "text",
  },
  direccion: {
    label: "Dirección *",
    //helperText: "texto de ayuda",
    type: "text",
  },
  tipo_personal: {
    label: "Tipo Personal *",
    helperText: "Tipo personal de la panaderia",
    type: "select",
    select: true,
    opciones: [],
  },
};

const formSchemaUsuario = {
  email: {
    label: "Correo *",
    type: "email",
  },
  password: {
    label: "Contraseña *",
    helperText: "por defecto el carnet de identidad",
    type: "text",
  },
  rol: {
    label: "Rol *",
    helperText: "rol que el usuario tendra en el sistema",
    type: "select",
    select: true,
    opciones: [
      {
        id: 1,
        nombre: "Administrador",
      },
      { id: 2, nombre: "Vendedor" },
      { id: 3, nombre: "Repartidor" },
    ],
  },
};
export { formSchema, formSchemaUsuario };
