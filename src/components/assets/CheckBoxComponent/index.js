"use client";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import React from "react";
import "@/styles/checkbox-component.scss";

const CheckBoxComponent = ({
  disabled = false,
  checked = false,
  onChange = () => {},
  label = "",
  indeterminate = false,
}) => {
  return (
    <>
      <FormControl onChange={!disabled ? onChange : () => {}}>
        <RadioGroup>
          <FormControlLabel
            control={
              <Checkbox
                indeterminate={indeterminate}
                checked={checked}
                size="small"
              />
            }
            className="Checkbox-comp__label"
            label={label}
          ></FormControlLabel>
        </RadioGroup>
      </FormControl>
    </>
  );
};

export default CheckBoxComponent;
