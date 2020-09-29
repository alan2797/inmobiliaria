import { V_REQUIRED, V_NUMERIC } from "constants/index";

const schema = {
  fecha_hora: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 50,
    },
  },
  total: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 10,
    },
  },
};

const schemaDetalle = {
  precio: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 5,
    },
  },
  cantidad: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 5,
    },
  },
};
export { schema, schemaDetalle };
