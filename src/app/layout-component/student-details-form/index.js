"use client";
import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useDropzone } from "react-dropzone";
import InputBoxComponent from "@/components/assets/InputBoxComponent";
import "@/styles/student-details-form.scss";
import Image from "next/image";
import en from "../../../../messages/en";
import { getImageByKey } from "@/services/utils/imagesFunc";

const {
  _StudentDetailsForm_: {
    _FieldIdentifiers_,
    _FieldPlaceholders_,
    _CheckboxLabel_,
    _Dropzone_,
  },
} = en;

const {
  _FullName_,
  _WhatsAppNumber_,
  _USN_,
  _City_,
  _SchoolPercentage_,
  _PucPercentage_,
} = _FieldIdentifiers_;

const {
  _PhFullName_,
  _PhWhatsAppNumber_,
  _PhUSN_,
  _PhCity_,
  _PhSchoolPercentage_,
  _PhPucPercentage_,
} = _FieldPlaceholders_;

const { _BackgroundAltText_, _DropIconAltText_, _UploadedAltText_ } =
  _Dropzone_;

function StudentDetailsForm({
  completeStuData = {},
  completeStuErr = {},
  setcompleteStuData = () => {},
  setcompleteStuErr = () => {},
  handleChange = () => {},
  isCheckedBox = false,
  setisCheckedBox = () => {},
}) {
  const [isDropDisabled, setIsDropDisabled] = useState(false);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setcompleteStuData((prev) => ({
        ...prev,
        image: URL.createObjectURL(file),
      }));
      setcompleteStuErr((prev) => ({ ...prev, image: "" }));
      setIsDropDisabled(true);
    }
  };

  const handleDelete = () => {
    setcompleteStuData((prev) => ({ ...prev, image: "" }));
    setIsDropDisabled(false);
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop,
    multiple: false,
    disabled: isDropDisabled,
  });

  const handleCheckboxChange = (event) => {
    const isChecked = event.target.checked;
    setisCheckedBox(isChecked);

    if (isChecked) {
      setcompleteStuData((prevState) => ({
        ...prevState,
        appNum: prevState.phoneNo,
      }));
      setcompleteStuErr((prevState) => ({
        ...prevState,
        appNum: "",
      }));
    } else {
      setcompleteStuData((prevState) => ({
        ...prevState,
        appNum: "",
      }));
    }
  };

  return (
    <Grid item xs={12} md={12} className="student-details-form">
      <Grid
        container
        className="student-details-form__drag-drop d-flex flex-column "
      >
        <Box
          {...getRootProps()}
          className={`student-details-form__dropzone ${
            isDropDisabled ? "student-details-form__dropzone--disabled" : " "
          }`}
        >
          <input {...getInputProps()} />
          {completeStuData.image ? (
            <Box className="student-details-form__image-container">
              <Image
                src={completeStuData.image}
                alt={_UploadedAltText_}
                className="student-details-form__uploaded-image"
                fill
              />
              <IconButton
                className="student-details-form__delete-button"
                onClick={handleDelete}
              >
                <DeleteIcon className="student-details-form__delete-icon" />
              </IconButton>
            </Box>
          ) : (
            <>
              <Image
                src={getImageByKey("stu_details_ellipse")}
                alt={_BackgroundAltText_}
                className="student-details-form__background-ellipse-image"
              />
              <Box className="student-details-form__drop-box">
                <Image
                  src={getImageByKey("stu_details_drop_img")}
                  alt={_DropIconAltText_}
                  className="student-details-form__drop-image"
                />
              </Box>
            </>
          )}
        </Box>
        {!!completeStuErr.image ? (
          <Typography className="student-details-form__error fs-12">
            {completeStuErr.image}
          </Typography>
        ) : (
          " "
        )}
      </Grid>

      <Box className="student-details-form__input-container">
        <Grid container rowSpacing={1} columnSpacing={2} textAlign="left">
          <Grid item xs={12} md={6}>
            <InputBoxComponent
              textLabel={_FullName_}
              placeholder={_PhFullName_}
              required
              name="fname"
              value={completeStuData.fname}
              onChange={handleChange}
              error={!!completeStuErr.fname}
              errorText={completeStuErr.fname}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputBoxComponent
              textLabel={_WhatsAppNumber_}
              placeholder={_PhWhatsAppNumber_}
              required
              name="appNum"
              value={completeStuData.appNum}
              onChange={handleChange}
              error={!!completeStuErr.appNum}
              errorText={completeStuErr.appNum}
              disabled={isCheckedBox}
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isCheckedBox}
                    onChange={handleCheckboxChange}
                  />
                }
                label={
                  <Typography className="student-details-form__input-container--checkbox-label fs-12 fw-600">
                    {_CheckboxLabel_}
                  </Typography>
                }
              />
            </FormGroup>
          </Grid>

          <Grid item xs={12} md={6}>
            <InputBoxComponent
              textLabel={_USN_}
              placeholder={_PhUSN_}
              required
              name="usn"
              value={completeStuData.usn}
              onChange={handleChange}
              error={!!completeStuErr.usn}
              errorText={completeStuErr.usn}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputBoxComponent
              textLabel={_City_}
              placeholder={_PhCity_}
              required
              name="city"
              value={completeStuData.city}
              onChange={handleChange}
              error={!!completeStuErr.city}
              errorText={completeStuErr.city}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputBoxComponent
              textLabel={_SchoolPercentage_}
              placeholder={_PhSchoolPercentage_}
              required
              name="schoolPer"
              value={completeStuData.schoolPer}
              onChange={handleChange}
              error={!!completeStuErr.schoolPer}
              errorText={completeStuErr.schoolPer}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <InputBoxComponent
              textLabel={_PucPercentage_}
              placeholder={_PhPucPercentage_}
              required
              name="pucPer"
              value={completeStuData.pucPer}
              onChange={handleChange}
              error={!!completeStuErr.pucPer}
              errorText={completeStuErr.pucPer}
            />
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default StudentDetailsForm;
