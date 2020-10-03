const formSchema = {
  direccion: {
    label: "Direccion *",
    type: "text",
  },
  precio: {
    label: "Precio *",
    //helperText: "texto de ayuda",
    type: "text",
  },
  moneda: {
    label: "Moneda *",
    helperText: "tipo de moneda de cambio",
    type: "select",
    select: true,
    opciones: [
      {
        id: "Bolivianos",
        nombre: "Bolivianos",
      },
      {
        id: "Dolar",
        nombre: "Dolar",
      },
    ],
  },
  tipo: {
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
  },
  propietarioId: {
    label: "Propietario *",
    helperText: "propietario del inmueble",
    type: "select",
    select: true,
    opciones: [],
  },
};

const formSchemaUbicacion = {
  ciudad: {
    label: "Ciudad *",
    helperText: "Ciudad donde se encuentra el inmueble",
    type: "select",
    select: true,
    opciones: [
      {
        id: "Santa cruz",
        nombre: "Santa Cruz",
      },
      {
        id: "Cochabamba",
        nombre: "Cochabamba",
      },
      {
        id: "La Paz",
        nombre: "La Paz",
      },
    ],
  },
  calle: {
    label: "Calle *",
    helperText:
      "por defecto el carnet de identidad, el usuario debera cambiarlo obligatoriamente",
    type: "text",
  },
  numero: {
    label: "Numero *",
    helperText: "Numero de el inmueble",
    type: "text",
  },
  descripcion: {
    label: "Descripcion *",
    helperText: "Descripcion mas detallada de la ubicacion del inmueble",
    type: "text",
  },
};

const formSchemaCaracteristica = {
  caracteristicaId: {
    label: "Caracteristica *",
    helperText: "Caracteristica del inmueble",
    type: "select",
    select: true,
    opciones: [],
  },
  descripcion: {
    label: "Descripcion *",
    helperText: "Descripcion de la caracteristica",
    type: "text",
  },
};
export { formSchema, formSchemaUbicacion, formSchemaCaracteristica };
