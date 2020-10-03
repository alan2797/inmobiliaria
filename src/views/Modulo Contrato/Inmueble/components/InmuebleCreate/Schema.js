import { V_REQUIRED, V_NUMERIC } from "constants/index";

const schema = {
  direccion: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 75,
    },
  },
  precio: {
    presence: { allowEmpty: true, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 50,
    },
  },
  precio: {
    presence: { allowEmpty: true, message: V_REQUIRED },
    length: {
      maximum: 50,
    },
  },
  tipo: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
  operacion: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
  propietarioId: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
};

const schemaUbicacion = {
  ciudad: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
  calle: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
  numero: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
  },
  descripcion: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
};

const schemaCaracteristica = {
  caracteristicaId: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
  descripcion: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 70,
    },
  },
};
export { schema, schemaUbicacion, schemaCaracteristica };
