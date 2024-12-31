"use client";
import React from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import confetti from "@/assets/accessories/celebration-fireworks-xUaa9Yemu7.png";
import "@/styles/submission-confirmation.scss";
import Image from "next/image";
import en from "../../../../messages/en";
import "@/styles/font.scss";

const {
  _SubmissionConfirmation_: { _FieldIdentifiers_, _Images_ },
} = en;

const { _Congratulations_, _RegistrationSuccessful_ } = _FieldIdentifiers_;

function SubmissionConfirmation() {
  return (
    <Grid container className="submission-confirmation">
      <Grid item className="submission-confirmation__image-container">
        <Box className="submission-confirmation__confetti-box">
          <Image
            src={confetti}
            alt={_Images_._ConfettiImageAlt_}
            className="submission-confirmation__confetti-image"
          />
        </Box>
      </Grid>
      <Grid item className="submission-confirmation__text-container">
        <Typography className="submission-confirmation__congratulations-text fs-30 fw-700">
          {_Congratulations_}
        </Typography>
        <Typography className="submission-confirmation__success-text fs-24 fw-600">
          {_RegistrationSuccessful_}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default SubmissionConfirmation;
