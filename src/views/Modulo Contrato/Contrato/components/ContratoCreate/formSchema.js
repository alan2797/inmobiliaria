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
  },
  fechaVencimiento: {
    label: "Fecha de vencimiento *",
    //helperText: "texto de ayuda",
    type: "date",
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

export { formSchema };
