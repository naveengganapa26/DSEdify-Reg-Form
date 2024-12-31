"use client";
import React, { useMemo, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  FormHelperText,
  Grid,
  Tooltip,
  Typography,
  Divider,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "@/styles/inputbox-component.scss";

const InputBoxComponent = ({
  readOnly = false,
  iconName = "",
  id = "",
  label = "",
  variant = "outlined",
  disabled = false,
  errorText = "",
  InputProps = {},
  color = "primary",
  fullWidth = true,
  size = "small",
  value = "",
  type = "text",
  placeholder = "",
  sx = {},
  onChange = () => {},
  onBlur = () => {},
  onClick = () => {},
  onKeyPress = () => {},
  name = "",
  autoComplete = "ON",
  multiline = false,
  rows = 0,
  textLabel = "",
  required = false,
  currency = false,
  endIconProp = "",
  maxLength = 255,
  autoFocus = false,
  subText = "",
  ...props
}) => {
  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });
  const [inputErrorMsg, setInputErrorMsg] = useState("");

  const handleClickShowPassword = () => {
    setPassword({
      ...password,
      showPassword: !password.showPassword,
    });
  };

  const handleWheel = (event) => {
    if (type === "number") {
      event.target.blur();
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (value.length > maxLength) {
      setInputErrorMsg(`Maximum of ${maxLength} characters are allowed`);
    } else {
      setInputErrorMsg("");
      onChange(e);
    }
  };

  const getType = useMemo(() => {
    if (password.showPassword || type === "number") {
      return "text";
    }
    return type;
  }, [type, password.showPassword]);

  return (
    <>
      <Grid className="input-box">
        <Typography
          className={`input-box__label ${
            disabled && "input-box__label--disabled"
          }`}
        >
          {textLabel}
          {required && <span className="input-box__label--required">*</span>}
          {subText && (
            <span className="input-box__label__sub-text">{subText}</span>
          )}
        </Typography>
      </Grid>
      <TextField
        className="input-box__text-field"
        name={name}
        id={id}
        label={label}
        variant={variant}
        disabled={disabled}
        placeholder={placeholder}
        error={Boolean(errorText)}
        InputLabelProps={{ shrink: true }}
        color={color}
        fullWidth={fullWidth}
        size={size}
        value={value ?? ""}
        type={getType}
        autoFocus={autoFocus}
        sx={{
          ...sx,
        }}
        onChange={handleChange}
        onKeyPress={onKeyPress}
        onBlur={onBlur}
        onClick={onClick}
        onWheel={handleWheel}
        multiline={multiline}
        rows={rows}
        InputProps={{
          readOnly,
          autoComplete: autoComplete,
          endAdornment:
            iconName === "password" ? (
              <>
                <Divider
                  orientation="vertical"
                  flexItem
                  className="input-box__text-field__icon-divider"
                />
                <Tooltip
                  title={
                    password.showPassword ? "Hide Password" : "Show Password"
                  }
                >
                  <IconButton
                    className="input-box__text-field__icon-button"
                    onClick={handleClickShowPassword}
                  >
                    {password.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              endIconProp
            ),
          ...InputProps,
        }}
        {...props}
      />
      {(errorText || inputErrorMsg) && (
        <FormHelperText className="input-box__error-text">
          {errorText || inputErrorMsg}
        </FormHelperText>
      )}
    </>
  );
};

export default InputBoxComponent;
