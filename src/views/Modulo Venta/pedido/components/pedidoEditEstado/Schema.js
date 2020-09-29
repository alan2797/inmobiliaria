import { V_REQUIRED } from "constants/index";

const schema = {
  observacion: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 200,
    },
  },
  estado: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
};
export { schema };
