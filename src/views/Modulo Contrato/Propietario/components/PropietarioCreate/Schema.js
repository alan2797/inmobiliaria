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
  ci: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 9,
    },
  },
  telefono: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 9,
    },
  },
  direccion: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 70,
    },
  },
  correo: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 70,
    },
  },
};

const schemaUsuario = {
  email: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
  password: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 70,
    },
  },
  rolId: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
};
export { schema, schemaUsuario };
