import { V_REQUIRED, V_NUMERIC } from "constants/index";

const schema = {
  nombre: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 50,
    },
  },
  descripcion: {
    presence: { allowEmpty: true, message: V_REQUIRED },
    length: {
      maximum: 200,
    },
  },
  precio: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    numericality: { message: V_NUMERIC },
    length: {
      maximum: 5,
    },
  },
  foto: {
    fileType: { message: 'tiene que ser una imagen', type: 'image'},
    fileSize: { message: 'tiene que tener un peso menor a 150k', size: 150},
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
};
export { schema };
