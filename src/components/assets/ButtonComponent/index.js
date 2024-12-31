"use client";

import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";
import "@/styles/button-component.scss";

const ButtonComponent = ({
  label = "Button",
  variant = "contained",
  onBtnClick = () => {},
  size = "small",
  muiProps = "",
  fullWidth = false,
  disabled = false,
  children,
  component = "",
  iconPosition = "start",
  icon = <Delete />,
  showIcon = false,
  onMouseLeave = () => {},
  onMouseEnter = () => {},
  ...props
}) => {
  const IconProp = showIcon
    ? iconPosition === "start"
      ? { startIcon: icon }
      : { endIcon: icon }
    : {};

  return (
    <Button
      component={component}
      {...IconProp}
      variant={variant}
      onClick={onBtnClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      size={size}
      className={`button-component ${
        disabled
          ? "button-disabled"
          : variant === "contained"
          ? "button-contained"
          : variant === "outlined"
          ? "button-outlined"
          : variant === "text"
          ? "button-text"
          : ""
      } ${muiProps}`}
      fullWidth={fullWidth}
      disabled={disabled}
      disableFocusRipple
      disableElevation
      {...props}
    >
      {label}
      {children}
    </Button>
  );
};

export default ButtonComponent;
