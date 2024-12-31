"use client";
import React from "react";
import { Grid, InputAdornment } from "@mui/material";
import "@/styles/contact-form.scss";
import InputBoxComponent from "@/components/assets/InputBoxComponent";
import ButtonComponent from "@/components/assets/ButtonComponent";
import en from "../../../../messages/en";

const {
  _ContactForm_: {
    _PhoneNumLabel_,
    _PhoneNumBtnLabel_,
    _VerfiyBtnLabel_,
    _EmailLabel_,
    _EmailBtnLabel_,
  },
} = en;

function ContactForm({
  completeStuData = {},
  completeStuErr = {},
  handleChange = () => {},
  validationState = {},
  validatePhoneNo = () => {},
  validateEmail = () => {},
}) {
  const { isPhoneNoValid, isEmailValid } = validationState;

  return (
    <Grid container className="contact-form__container ">
      <Grid
        container
        className={` ${
          !!completeStuErr.phoneNo
            ? "contact-form__altrow"
            : "contact-form__row"
        }`}
      >
        <Grid item xs={8} className="contact-form__input-container">
          <InputBoxComponent
            fullWidth
            required
            textLabel={_PhoneNumLabel_}
            placeholder={_PhoneNumLabel_}
            size="small"
            disabled={isPhoneNoValid}
            name="phoneNo"
            value={completeStuData.phoneNo}
            onChange={(event) => handleChange(event)}
            error={!!completeStuErr.phoneNo}
            errorText={completeStuErr.phoneNo || ""}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">+91</InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={4} className="contact-form__button-container">
          <ButtonComponent
            className="contact-form__button-comp"
            label={isPhoneNoValid ? _VerfiyBtnLabel_ : _PhoneNumBtnLabel_}
            size="large"
            onBtnClick={validatePhoneNo}
            disabled={isPhoneNoValid}
          />
        </Grid>
      </Grid>

      {isPhoneNoValid && (
        <Grid
          container
          className={` ${
            !!completeStuErr.email
              ? "contact-form__altrow"
              : "contact-form__row"
          }`}
        >
          <Grid item xs={8} className="contact-form__input-container">
            <InputBoxComponent
              fullWidth
              required
              textLabel={_EmailLabel_}
              placeholder={_EmailLabel_}
              size="small"
              disabled={isEmailValid}
              name="email"
              value={completeStuData.email}
              onChange={(event) => handleChange(event)}
              error={!!completeStuErr.email}
              errorText={completeStuErr.email || ""}
            />
          </Grid>

          <Grid item xs={4} className="contact-form__button-container">
            <ButtonComponent
              className="contact-form__button-comp"
              label={isEmailValid ? _VerfiyBtnLabel_ : _EmailBtnLabel_}
              size="large"
              onBtnClick={validateEmail}
              disabled={isEmailValid}
            />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}

export default ContactForm;
