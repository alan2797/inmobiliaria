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
  correo: {
    label: "Correo *",
    //helperText: "texto de ayuda",
    type: "email",
  },
  cargo: {
    label: "Cargo Personal *",
    helperText: "Cargo personal de la inmobiliaria",
    type: "select",
    select: true,
    opciones: [
      {
        id: "Administrador",
        nombre: "Administrador",
      },
      {
        id: "Secretaria",
        nombre: "Secretaria",
      },
      {
        id: "Agente",
        nombre: "Agente",
      },
    ],
  },
};

const formSchemaUsuario = {
  username: {
    label: "Username *",
    type: "text",
  },
  password: {
    label: "Contraseña *",
    helperText:
      "por defecto el carnet de identidad, el usuario debera cambiarlo obligatoriamente",
    type: "text",
  },
  rolId: {
    label: "Rol *",
    helperText: "rol que el usuario tendra en el sistema",
    type: "select",
    select: true,
    opciones: [],
  },
};
export { formSchema, formSchemaUsuario };
