import { V_REQUIRED, V_NUMERIC } from "constants/index";

const schema = {
  nombre: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 50,
    },
  },
  tipo: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
  descripcion: {
    presence: { allowEmpty: true, message: V_REQUIRED },
    length: {
      maximum: 150,
    },
  },
  url: {
    presence: { allowEmpty: true, message: V_REQUIRED },
    length: {
      maximum: 100,
    },
  },
};
export { schema };
