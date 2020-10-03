import { V_REQUIRED, V_NUMERIC } from "constants/index";

const schema = {
  nombre: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 50,
    },
  },
  descripcion: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 150,
    },
  },
};
export { schema };
