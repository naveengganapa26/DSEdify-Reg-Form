"use client";
import React, { useState } from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import ButtonComponent from "@/components/assets/ButtonComponent";
import Image from "next/image";
import validationRegex from "@/services/utils/regexUtils";
import en from "../../../messages/en.json";
import ContactForm from "@/app/layout-component/contact-form";
import StudentDetailsForm from "@/app/layout-component/student-details-form";
import AcademicInfoForm from "@/app/layout-component/academic-info-form";
import SubmissionConfirmation from "@/app/layout-component/submission-confirmation";
import { getImageByKey } from "@/services/utils/imagesFunc";

const {
  emailRegex,
  phoneNumberRegex,
  personNameRegex,
  usnRegex,
  cityRegex,
  percentageRegex,
  decimal_2digitRegex,
  decimal_page3Regex,
} = validationRegex;

const {
  _ValidationMessage_: {
    _FieldRequired_,
    _Email_,
    _Numbers_,
    _AlphaNumericMin3_,
    _Usn_,
    _City_,
    _ValidPercentage_,
    _DecimalDigits_,
  },
  _LayoutComp_: { _FieldIdentifiers_, _Images_ },
} = en;

const {
  _StudentRegistrationForm_,
  _DriveCode_,
  _DriveCodeNum_,
  _Step_,
  _Back_,
  _Continue_,
  _GetStarted_,
  _BackToHome_,
  _PageNum_,
} = _FieldIdentifiers_;

const { _SuccessImageAlt_, _DesignImageAlt_, _LogoImage_ } = _Images_;

function LayoutComp() {
  const [registerFromCount, setregisterFromCount] = useState(1);
  const [completeStuData, setcompleteStuData] = useState({
    phoneNo: "",
    email: "",

    fname: "",
    appNum: "",
    usn: "",
    city: "",
    schoolPer: "",
    pucPer: "",
    image: "",

    degreeFields: [
      { degree: "", branch: "", gradingSystem: "", percentage: "" },
    ],
    checkedBox: { pastBackLogs: false, presentBackLogs: false },
  });

  console.log(completeStuData);

  const [completeStuErr, setcompleteStuErr] = useState({
    phoneNo: "",
    email: "",

    fname: "",
    appNum: "",
    usn: "",
    city: "",
    schoolPer: "",
    pucPer: "",
    image: "",

    degreeFields: [
      { degree: "", branch: "", gradingSystem: "", percentage: "" },
    ],
  });

  const [validationState, setValidationState] = useState({
    isPhoneNoValid: false,
    isEmailValid: false,
  });

  const [isCheckedBox, setisCheckedBox] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setcompleteStuData({
      ...completeStuData,
      [event.target.name]: event.target.value,
    });

    if (name === "appNum") {
      setisCheckedBox(value === completeStuData.phoneNo);
    }

    const { error } = validateFields(name, value);
    setcompleteStuErr((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const validateField = (fieldName, value, regex, errorMessage) => {
    let formErrors = { ...completeStuErr };
    let isValid = true;

    if (!value) {
      formErrors[fieldName] = _FieldRequired_;
      isValid = false;
    } else if (!regex.test(value)) {
      formErrors[fieldName] = errorMessage;
      isValid = false;
    } else {
      formErrors[fieldName] = "";
    }

    setcompleteStuErr(formErrors);

    if (fieldName === "phoneNo") {
      setValidationState((prev) => ({
        ...prev,
        isPhoneNoValid: isValid,
      }));
    } else if (fieldName === "email") {
      setValidationState((prev) => ({
        ...prev,
        isEmailValid: isValid,
      }));
    }

    return isValid;
  };

  const validatePhoneNo = () => {
    return validateField(
      "phoneNo",
      completeStuData.phoneNo,
      phoneNumberRegex,
      _Numbers_
    );
  };

  const validateEmail = () => {
    return validateField("email", completeStuData.email, emailRegex, _Email_);
  };

  const validateFields = (field, value) => {
    let error = "";
    let isValid = true;

    switch (field) {
      case "fname":
        if (!value) {
          error = _FieldRequired_;
          isValid = false;
        } else if (!personNameRegex.test(value)) {
          error = _AlphaNumericMin3_;
          isValid = false;
        }
        break;

      case "appNum":
        if (!value) {
          error = _FieldRequired_;
          isValid = false;
        } else if (!phoneNumberRegex.test(value)) {
          error = _Numbers_;
          isValid = false;
        }
        break;

      case "usn":
        if (!value) {
          error = _FieldRequired_;
          isValid = false;
        } else if (!usnRegex.test(value)) {
          error = _Usn_;
          isValid = false;
        }
        break;

      case "city":
        if (!value) {
          error = _FieldRequired_;
          isValid = false;
        } else if (!cityRegex.test(value)) {
          error = _City_;
          isValid = false;
        }
        break;

      case "schoolPer":
      case "pucPer":
        if (!value) {
          error = _FieldRequired_;
          isValid = false;
        } else if (!percentageRegex.test(value)) {
          error = _ValidPercentage_;
          isValid = false;
        } else if (decimal_2digitRegex.test(value)) {
          error = _DecimalDigits_;
          isValid = false;
        }
        break;

      case "image":
        if (!value) {
          error = "Photo is required.";
          isValid = false;
        }
        break;

      default:
        break;
    }

    return { isValid, error };
  };

  const validateAllFields = () => {
    let allValid = true;
    let errors = {};

    Object.keys(completeStuData).forEach((field) => {
      const { isValid, error } = validateFields(field, completeStuData[field]);
      if (!isValid) allValid = false;
      errors[field] = error;
    });

    setcompleteStuErr(errors);

    return allValid;
  };

  const handleNxtFormComp = () => {
    if (registerFromCount === 4) {
      setregisterFromCount(1);
    } else {
      setregisterFromCount(registerFromCount + 1);
    }
  };

  const handleChangeBack = () => {
    if (registerFromCount > 1) {
      setregisterFromCount((prev) => prev - 1);
      console.log("handleback");
    }
  };

  const handleChangeContactFrom = () => {
    if (validatePhoneNo() && validateEmail()) {
      handleNxtFormComp();
    }
  };

  const handleChangeAcademicInfoFrom = () => {
    if (validateAllFields()) {
      handleNxtFormComp();
    }
  };

  // form 3 functionalites
  const handleUpdateStuData = (field, value) => {
    setcompleteStuData((prev) => ({
      ...prev,
      [field]: value,
    }));
    validateFieldDegree(field, value);
  };

  const handleUpdateStuError = (field, value) => {
    setcompleteStuErr((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdateDegreeFields = (index, field, value) => {
    setcompleteStuData((prev) => {
      const updatedDegreeFields = [...prev.degreeFields];
      if (!updatedDegreeFields[index]) {
        updatedDegreeFields[index] = {
          degree: "",
          branch: "",
          gradingSystem: "",
          percentage: "",
        };
      }
      updatedDegreeFields[index][field] = value;
      return { ...prev, degreeFields: updatedDegreeFields };
    });

    setcompleteStuErr((prev) => {
      const updatedErrors = [...prev.degreeFields];
      if (!updatedErrors[index]) {
        updatedErrors[index] = {
          degree: false,
          branch: false,
          gradingSystem: false,
          percentage: false,
        };
      }
      updatedErrors[index][field] = !validateFieldDegree(
        field,
        value,
        completeStuData.degreeFields[index]
      );
      return { ...prev, degreeFields: updatedErrors };
    });
  };

  const validateFieldDegree = (field, value, formData) => {
    switch (field) {
      case "degree":
      case "branch":
        return value.trim() !== "";

      case "gradingSystem":
        return value.trim() !== "";

      case "percentage": {
        const numValue = Number(value);

        const isValidRange =
          formData.gradingSystem === "PT"
            ? numValue >= 0 && numValue <= 100
            : formData.gradingSystem === "CGPA"
            ? numValue >= 0 && numValue <= 10
            : false;

        const hasTwoDecimals = decimal_page3Regex.test(value);

        return (
          value.trim() !== "" &&
          !isNaN(numValue) &&
          isValidRange &&
          hasTwoDecimals
        );
      }

      default:
        return false;
    }
  };

  const handleUpdateCheckedBox = (field, value) => {
    setcompleteStuData((prev) => ({
      ...prev,
      checkedBox: {
        ...prev.checkedBox,
        [field]: value,
      },
    }));
  };

  const validateDegreeForm = () => {
    const newErrors = completeStuData.degreeFields.map((field) => ({
      degree: field.degree?.trim() === "",
      branch: field.branch?.trim() === "",
      gradingSystem: field.gradingSystem?.trim() === "",
      percentage:
        !field.gradingSystem ||
        field.percentage?.trim() === "" ||
        (field.gradingSystem === "PT" &&
          (isNaN(Number(field.percentage)) ||
            Number(field.percentage) < 0 ||
            Number(field.percentage) > 100 ||
            !/^\d+(\.\d{1,2}})?$/.test(field.percentage))) ||
        (field.gradingSystem === "CGPA" &&
          (isNaN(Number(field.percentage)) ||
            Number(field.percentage) < 0 ||
            Number(field.percentage) > 10 ||
            !/^\d+(\.\d{1,2})?$/.test(field.percentage))),
    }));

    setcompleteStuErr((prev) => ({
      ...prev,
      degreeFields: newErrors,
    }));

    return !newErrors.some((fieldErrors) =>
      Object.values(fieldErrors).some((error) => error)
    );
  };

  const handleAddDegreeField = () => {
    const newField = {
      degree: "",
      branch: "",
      gradingSystem: "",
      percentage: "",
    };
    const newError = {};
    handleUpdateStuData("degreeFields", [
      newField,
      ...completeStuData.degreeFields,
    ]);
    handleUpdateStuError("degreeFields", [
      newError,
      ...completeStuErr.degreeFields,
    ]);
  };

  const handleDeleteDegreeField = (index) => {
    const updatedFields = completeStuData.degreeFields.filter(
      (_, i) => i !== index
    );

    const updatedErrors = Array.isArray(completeStuErr.degreeFields)
      ? completeStuErr.degreeFields.filter((_, i) => i !== index)
      : [];

    handleUpdateStuData("degreeFields", updatedFields);
    handleUpdateStuError("degreeFields", updatedErrors);
  };

  const handleChangeStuDetailsFrom = () => {
    if (validateDegreeForm()) {
      handleNxtFormComp();
    }
  };

  const handleBtnFormValControl = () => {
    if (registerFromCount === 2) {
      handleChangeAcademicInfoFrom();
    } else if (registerFromCount === 3) {
      handleChangeStuDetailsFrom();
    }
  };

  const getLeftSectionBgImage = (registerFromCount) => {
    switch (registerFromCount) {
      case 1:
        return getImageByKey("contact_form_bg_img");
      case 2:
        return getImageByKey("stu_details_bg_img");
      case 3:
        return getImageByKey("academic_info_bg_img");
      case 4:
        return getImageByKey("submission_bg_img");
      default:
        return getImageByKey("academic_info_bg_img");
    }
  };

  return (
    <Grid container className="layout-comp">
      <Grid item className="layout-comp__left-section" md={4}>
        <Box className="layout-comp__left-section__bgImg-box">
          <Image
            className="layout-comp__left-section__bgImg-box__main-image"
            src={getLeftSectionBgImage(registerFromCount)}
            alt={_SuccessImageAlt_}
            fill
          />
        </Box>

        <Box className="layout-comp__left-section__bgImg-box__white-vector-box">
          <Image
            className="layout-comp__left-section__bgImg-box__white-vector-image"
            src={getImageByKey("white_vector_bg_img")}
            alt={_DesignImageAlt_}
          />
        </Box>

        <Image
          className="layout-comp__left-section__bgImg-box__blue-vector-image"
          src={getImageByKey("blue_vector_bg_img")}
          alt={_DesignImageAlt_}
        />
      </Grid>

      <Grid item className="layout-comp__right-section " xs={12} md={8}>
        <Grid
          item
          container
          className="layout-comp__right-section__container d-flex flex-column"
        >
          <Box className="layout-comp__right-section__container__counter-box">
            <Typography
              className={`layout-comp__right-section__container__counter-text fs-20 fw-700 ${
                registerFromCount === 4 ? "hidden" : ""
              }`}
            >
              {_Step_}: <span>{registerFromCount}</span>/{_PageNum_}
            </Typography>
          </Box>

          <Box className="layout-comp__right-section__container__logo-box">
            <Image
              className="layout-comp__right-section__container__logo-image"
              src={getImageByKey("logo__edify")}
              alt={_LogoImage_}
            />
          </Box>

          <Box className="layout-comp__right-section__container__form-title-box">
            <Typography className="layout-comp__right-section__container__form-title-box__label fs-32 fw-700">
              {_StudentRegistrationForm_}
            </Typography>

            <Typography className="layout-comp__right-section__container__form-title-box__label-code fs-23 fw-700">
              {_DriveCode_} : {_DriveCodeNum_}
            </Typography>
          </Box>
        </Grid>

        <Box className="layout-comp__right-section__container__form-components-box">
          <Grid item container>
            {registerFromCount === 1 && (
              <ContactForm
                completeStuData={completeStuData}
                completeStuErr={completeStuErr}
                handleChange={handleChange}
                validationState={validationState}
                validatePhoneNo={validatePhoneNo}
                validateEmail={validateEmail}
                handleChangeAcademicInfoFrom={handleChangeAcademicInfoFrom}
              />
            )}

            {registerFromCount === 2 && (
              <StudentDetailsForm
                completeStuData={completeStuData}
                completeStuErr={completeStuErr}
                setcompleteStuData={setcompleteStuData}
                setcompleteStuErr={setcompleteStuErr}
                handleChange={handleChange}
                isCheckedBox={isCheckedBox}
                setisCheckedBox={setisCheckedBox}
              />
            )}

            {registerFromCount === 3 && (
              <AcademicInfoForm
                completeStuData={completeStuData}
                completeStuErr={completeStuErr}
                handleUpdateStuData={handleUpdateStuData}
                handleUpdateDegreeFields={handleUpdateDegreeFields}
                handleUpdateCheckedBox={handleUpdateCheckedBox}
                handleUpdateStuError={handleUpdateStuError}
                handleAddDegreeField={handleAddDegreeField}
                handleDeleteDegreeField={handleDeleteDegreeField}
              />
            )}

            {registerFromCount === 4 && <SubmissionConfirmation />}
          </Grid>
        </Box>

        {registerFromCount === 1 && (
          <Box className="layout-comp__right-section__container__btn__contact-form-btn ">
            <ButtonComponent
              className="getStartedBtn fw-700"
              label={_GetStarted_}
              disabled={
                !(
                  validationState.isPhoneNoValid && validationState.isEmailValid
                )
              }
              onBtnClick={() => {
                handleChangeContactFrom();
              }}
            />
          </Box>
        )}

        {(registerFromCount === 2 || registerFromCount === 3) && (
          <Box className="layout-comp__right-section__container__btn-box">
            <Grid item container>
              <Grid
                item
                className="layout-comp__right-section__container__btn-container"
                xs={12}
              >
                <ButtonComponent
                  className="layout-comp__right-section__container__back-btn fs-15 fw-700"
                  startIcon={<ArrowCircleLeftIcon />}
                  label={_Back_}
                  variant="outlined"
                  onBtnClick={() => handleChangeBack()}
                />

                <ButtonComponent
                  className="layout-comp__right-section__container__continue-btn fs-15 fw-700"
                  label={_Continue_}
                  onBtnClick={handleBtnFormValControl}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {registerFromCount === 4 && (
          <Box>
            <ButtonComponent
              className="layout-comp__right-section__container__submission-btn fs-15 fw-700"
              label={_BackToHome_}
              onBtnClick={() => {
                handleNxtFormComp();
              }}
            />
          </Box>
        )}
      </Grid>
    </Grid>
  );
}

export default LayoutComp;
