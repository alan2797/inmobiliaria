import React from "react";
import { Button } from "@material-ui/core";
import { Can } from "components/Can";
import Tooltip from "@material-ui/core/Tooltip";
const ButtonC = (props) => {
  const {
    color,
    className,
    disabled,
    size,
    onClick,
    variant,
    title,
    startIcon,
    endIcon,
    id,
    tooltip,
    style,
  } = props;

  const renderButton = (
    <Button
      color={color}
      className={className}
      disabled={disabled}
      size={size}
      style={style}
      // type="submit"
      onClick={onClick}
      variant={variant}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {title}
    </Button>
  );
  return (
    <Can id={id}>
      {tooltip ? (
        <Tooltip title={tooltip} placement="top" arrow>
          {renderButton}
        </Tooltip>
      ) : (
        renderButton
      )}
    </Can>
  );
};
export { ButtonC as Button };
