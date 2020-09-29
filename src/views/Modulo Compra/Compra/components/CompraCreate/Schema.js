import { V_REQUIRED, V_NUMERIC } from "constants/index";

const schema = {
  fecha_hora: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 200,
    },
  },
  total: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 20,
    },
  },
  fkidproveedor: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
};

const schemaDetalle = {
  id: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
  cantidad: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 7,
    },
  },
  precio: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 7,
    },
  },
};
export { schema, schemaDetalle };
