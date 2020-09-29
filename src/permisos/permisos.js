const PERMISOS = "permisos";
const havePermision = (id) => {
  const permisos = JSON.parse(localStorage.getItem(PERMISOS));

  if (permisos.find((permiso) => permiso.id === id)) return true;
};

export { havePermision };
