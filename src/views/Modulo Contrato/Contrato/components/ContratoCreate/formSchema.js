const formSchema = {
  tipo: {
    label: "Tipo de Contrato *",
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
  duracion: {
    label: "Duracion de contrato *",
    helperText: "permite datos numericos y texto, sea detallado",
    type: "text",
  },
  valor: {
    label: "Valor del contrato *",
    //helperText: "texto de ayuda",
    type: "text",
  },
  moneda: {
    label: "Moneda *",
    type: "select",
    select: true,
    opciones: [
      {
        id: "Bolivianos",
        nombre: "Bolivianos",
      },
      {
        id: "Dolares",
        nombre: "Dolares",
      },
    ],
  },
  fechaFirma: {
    label: "Fecha de firma *",
    //helperText: "texto de ayuda",
    type: "date",
    shrink: true,
  },
  fechaVencimiento: {
    label: "Fecha de vencimiento *",
    //helperText: "texto de ayuda",
    type: "date",
    shrink: true,
  },
  clienteId: {
    label: "Cliente *",
    type: "select",
    select: true,
    opciones: [
      {
        id: "Angelica chavez",
        nombre: "Angelica chavez",
      },
      {
        id: "Daniel Lopez",
        nombre: "Daniel Lopez",
      },
      {
        id: "Josue Rios",
        nombre: "Josue Rios",
      },
    ],
  },
  inmuebleId: {
    label: "Inmueble *",
    helperText: "Tipo Inmueble y propietario",
    type: "select",
    select: true,
    opciones: [],
  },
};

const formSchemaInmueble = {
  inmuebleId: {
    label: "Inmueble *",
    helperText: "Tipo Inmueble y propietario",
    type: "select",
    select: true,
    opciones: [],
  },
  tipo: {
    label: "Tipo de Contrato *",
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

  ciudad: {
    label: "Ciudad *",
    helperText: "En que ciudad esta ubicado el inmueble",
    type: "select",
    select: true,
    opciones: [
      {
        id: "Santa Cruz",
        nombre: "Santa Cruz",
      },
      {
        id: "La Paz",
        nombre: "La Paz",
      },
    ],
  },
  zona: {
    label: "Zona *",
    helperText: "En que zona esta ubicado el inmueble",
    type: "text",
  },
  numero: {
    label: "Numero ",
    helperText: "Numero del inmueble",
    type: "text",
  },
};

const formSchemaPropietario = {
  nombre: {
    label: "Nombre *",
    helperText: "Nombre del propietario",
    type: "text",
  },
  apellido: {
    label: "Apellido *",
    helperText: "apellido del propietario",
    type: "text",
  },
  ci: {
    label: "Carnet de identidad *",
    helperText: "Carnet de identidad del propietario",
    type: "text",
  },
  telefono: {
    label: "Telefono - Celular *",
    helperText: "Telefono - celular del propietario",
    type: "text",
  },
};

const formSchemaInquilino = {
  nombre: {
    label: "Nombre *",
    helperText: "Nombre del Inquilino",
    type: "text",
  },
  apellido: {
    label: "Apellido *",
    helperText: "apellido del Inquilino",
    type: "text",
  },
  ci: {
    label: "Carnet de identidad *",
    helperText: "Carnet de identidad del Inquilino",
    type: "text",
  },
  telefono: {
    label: "Telefono - Celular *",
    helperText: "Telefono - celular del Inquilino",
    type: "text",
  },
};

const formSchemaDuracion = {
  fecha_inicio: {
    label: "Fecha de Inicio *",
    helperText: "Fecha de Inicio del contrato",
    type: "date",
    shrink: true,
  },
  fecha_final: {
    label: "Fecha final *",
    helperText: "Fecha final del contrato",
    type: "date",
    shrink: true,
  },
  monto: {
    label: "Monto *",
    helperText: "Monto a pagar",
    type: "text",
  },
  moneda: {
    label: "Moneda *",
    //helperText: "Monto a pagar",
    type: "select",
    select: true,
    opciones: [
      {
        id: "Bolivianos",
        nombre: "Bolivianos",
      },
      {
        id: "Dolares",
        nombre: "Dolares",
      },
    ],
  },
  entrega_pago: {
    label: "Entrega del pago *",
    helperText:
      "Cada cuanto se realizara el pago por parte del inquilino y que dia",
    type: "text",
  },
  tipo_pago: {
    label: "Tipo de pago *",
    //helperText: "Monto a pagar",
    type: "select",
    select: true,
    opciones: [
      {
        id: "Efectivo",
        nombre: "Efectivo",
      },
      {
        id: "Transferencia Bancaria",
        nombre: "Transferencia Bancaria",
      },
    ],
  },
};
export {
  formSchema,
  formSchemaInmueble,
  formSchemaPropietario,
  formSchemaInquilino,
  formSchemaDuracion,
};
