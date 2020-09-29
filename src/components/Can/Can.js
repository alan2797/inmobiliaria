import { havePermision } from "permisos";

const Can = (props) => {
  const { id, children } = props;

  if (typeof id === "undefined" || id === null) {
    return children;
  }
  if (havePermision(id)) {
    return children;
  }
  return null;
};

export { Can };
