import { V_REQUIRED, V_NUMERIC } from "constants/index";

const schema = {
  tipo: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 50,
    },
  },
  duracion: {
    presence: { allowEmpty: true, message: V_REQUIRED },
    length: {
      maximum: 50,
    },
  },
  valor: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 9,
    },
  },
  fechaFirma: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 10,
    },
  },
  fechaVencimiento: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 10,
    },
  },
  clienteId: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
  inmuebleId: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
};

const schemaInmueble = {
  tipo: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
  inmuebleId: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
  ciudad: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 50,
    },
  },
  zona: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 100,
    },
  },
  numero: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 50,
    },
  },
};

const schemaPropietario = {
  nombre: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 50,
    },
  },
  apellido: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 50,
    },
  },
  ci: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 50,
    },
  },
  telefono: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 50,
    },
  },
};

const schemaInquilino = {
  nombre: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 50,
    },
  },
  apellido: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 50,
    },
  },
  ci: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 50,
    },
  },
  telefono: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 50,
    },
  },
};

const schemaDuracion = {
  fecha_inicio: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
  fecha_final: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
  monto: {
    presence: { allowEmpty: false, message: V_REQUIRED },

    numericality: { message: V_NUMERIC },
  },
  moneda: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
  entrega_pago: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
  tipo_pago: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
};
export {
  schema,
  schemaInmueble,
  schemaPropietario,
  schemaInquilino,
  schemaDuracion,
};
