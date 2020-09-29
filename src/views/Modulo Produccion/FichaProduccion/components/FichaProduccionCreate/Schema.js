import { V_REQUIRED, V_NUMERIC } from "constants/index";

const schema = {
  fecha_hora: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 200,
    },
  },
  cantidad: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 7,
    },
  },
  producto: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
  },
};

const schemaDetalle = {
  insumo: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
  cantidad: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 7,
    },
  },
};

const schemaPersonal = {
  personal: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
};
export { schema, schemaDetalle, schemaPersonal };
