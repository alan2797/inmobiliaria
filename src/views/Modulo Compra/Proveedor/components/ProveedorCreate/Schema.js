import { V_REQUIRED, V_NUMERIC } from "constants/index";

const schema = {
  nombre: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 50,
    },
  },
  apellido: {
    presence: { allowEmpty: true, message: V_REQUIRED },
    length: {
      maximum: 50,
    },
  },
  telefono_celular: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 9,
    },
  },
  email: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
};

export { schema };
