import { V_REQUIRED, V_NUMERIC } from "constants/index";

const schema = {
  username: {
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
  personalId: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
  rolId: {
    presence: { allowEmpty: false, message: V_REQUIRED },
  },
};
export { schema };
