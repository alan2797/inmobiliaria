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

export { schema };
