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
  /*tipo: {
    label: "Tipo de Inmueble *",
    helperText: "tipo de inmueble",
    type: "select",
    select: true,
    opciones: [
      {
        id: "Casa",
        nombre: "Casa",
      },
      {
        id: "Departamento",
        nombre: "Departamento",
      },
      {
        id: "Lote",
        nombre: "Lote",
      },
      {
        id: "Oficina",
        nombre: "Oficina",
      },
      {
        id: "Local",
        nombre: "Local",
      },
    ],
  },
  operacion: {
    label: "Operacion de servicio *",
    helperText: "que tipo de contrato se hara del inmueble",
    type: "select",
    select: true,
    opciones: [
      {
        id: "Alquiler",
        nombre: "Alquiler",
      },
      {
        id: "Anticretico",
        nombre: "Anticretico",
      },
      {
        id: "Venta",
        nombre: "Venta",
      },
    ],
  },*/
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
