import { V_REQUIRED, V_NUMERIC } from "constants/index";

const schema = {
  email: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 50,
    },
  },
  password: {
    presence: { allowEmpty: false, message: V_REQUIRED },
    length: {
      maximum: 50,
    },
  },
  idpersonal: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
};
export { schema };
