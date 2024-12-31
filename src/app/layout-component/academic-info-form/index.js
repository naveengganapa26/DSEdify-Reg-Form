"use client";
import React from "react";
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ButtonComponent from "@/components/assets/ButtonComponent";
import CheckBoxComponent from "@/components/assets/CheckBoxComponent";
import "@/styles/academic-info-from.scss";
import en from "../../../../messages/en";
import { BRANCHES, DEGREES, GRADINGSYSTEMS } from "@/constants/options/option";

const {
  _ValidationMessage_,
  _AcademicInfoForm_: { _FieldIdentifiers_, _ButtonLabels_ },
} = en;

const {
  _SelectDegreeSpecialization_,
  _SelectBranch_,
  _SelectGradingSystem_,
  _InvalidPercentage_,
  _InvalidCGPA_,
  _InvalidDecimalPlaces_,
} = _ValidationMessage_;

const {
  _AddDegreeButton_,
  _DegreeSpecialization_,
  _Branch_,
  _GradingSystem_,
  _DegreePercentage_,
  _AnyEarlierBacklogs_,
  _AnyPresentBacklogs_,
} = _FieldIdentifiers_;

function AcademicInfoForm({
  completeStuData = {},
  completeStuErr = {},
  handleUpdateDegreeFields = () => {},
  handleUpdateCheckedBox = () => {},
  handleAddDegreeField = () => {},
  handleDeleteDegreeField = () => {},
}) {
  return (
    <Grid item xs={12} md={12} className="academic-info-form">
      <Grid item container className="academic-info-form__add-degree-container">
        <ButtonComponent
          className="academic-info-form__add-degree-btn"
          startIcon={
            <AddCircleOutlineIcon className="academic-info-form__add-degree-btn-icon fs-20 fw-700" />
          }
          label={
            <Typography className="academic-info-form__add-degree-btn-label fs-16 fw-700">
              {_AddDegreeButton_}
            </Typography>
          }
          variant="text"
          onBtnClick={handleAddDegreeField}
        />
      </Grid>

      <Box className="academic-info-form__degree-container">
        <Grid container columnSpacing={2} rowSpacing={2}>
          {completeStuData.degreeFields.map((field, index) => (
            <React.Fragment key={index}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <label className="academic-info-form__input-label fs-14 fw-700">
                    {_DegreeSpecialization_} <span className="required">*</span>
                  </label>
                  <Select
                    value={field.degree}
                    onChange={(event) =>
                      handleUpdateDegreeFields(
                        index,
                        "degree",
                        event.target.value
                      )
                    }
                    displayEmpty
                    MenuProps={{
                      PaperProps: {
                        className: "academic-info-form__input-paper-props",
                      },
                    }}
                  >
                    {DEGREES.map((option) => (
                      <MenuItem
                        key={option.value}
                        className="menu-item"
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {completeStuErr.degreeFields[index]?.degree && (
                    <Typography color="error" variant="body2">
                      {_SelectDegreeSpecialization_}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <label className="academic-info-form__input-label fs-14 fw-700">
                    {_Branch_}
                    <span className="required">*</span>
                  </label>
                  <Select
                    value={field.branch}
                    onChange={(event) =>
                      handleUpdateDegreeFields(
                        index,
                        "branch",
                        event.target.value
                      )
                    }
                    displayEmpty
                    MenuProps={{
                      PaperProps: {
                        className: "academic-info-form__input-paper-props",
                      },
                    }}
                  >
                    {BRANCHES.map((option) => (
                      <MenuItem
                        key={option.value}
                        className="menu-item"
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {completeStuErr.degreeFields[index]?.branch && (
                    <Typography color="error" variant="body2">
                      {_SelectBranch_}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <label className="academic-info-form__input-label fs-14 fw-700">
                    {_GradingSystem_}
                    <span className="required">*</span>
                  </label>

                  <Select
                    value={field.gradingSystem}
                    displayEmpty
                    placeholder="texttt"
                    onChange={(event) => {
                      handleUpdateDegreeFields(
                        index,
                        "gradingSystem",
                        event.target.value
                      );
                    }}
                    MenuProps={{
                      PaperProps: {},
                    }}
                  >
                    {GRADINGSYSTEMS.map((option) => (
                      <MenuItem
                        key={option.value}
                        className="menu-item"
                        value={option.value}
                      >
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>

                  {completeStuErr.degreeFields[index]?.gradingSystem && (
                    <Typography color="error" variant="body2">
                      {_SelectGradingSystem_}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <label className="academic-info-form__input-label fs-14 fw-700">
                    {_DegreePercentage_}
                    <span className="required">*</span>
                  </label>

                  <TextField
                    className="academic-info-form__textfield"
                    size="small"
                    type="tel"
                    placeholder="Enter percentage or cgpa"
                    value={field.percentage}
                    onChange={(event) => {
                      handleUpdateDegreeFields(
                        index,
                        "percentage",
                        event.target.value
                      );
                    }}
                  />

                  {completeStuErr.degreeFields[index]?.percentage && (
                    <Typography color="error" variant="body2">
                      {field.gradingSystem === ""
                        ? _SelectGradingSystem_
                        : field.gradingSystem === "CGPA"
                        ? isNaN(Number(field.percentage)) ||
                          Number(field.percentage) < 1 ||
                          Number(field.percentage) > 10
                          ? _InvalidCGPA_
                          : !/^\d+(\.\d{1,2})?$/.test(field.percentage)
                          ? _InvalidDecimalPlaces_
                          : ""
                        : field.gradingSystem === "PT"
                        ? isNaN(Number(field.percentage)) ||
                          Number(field.percentage) < 1 ||
                          Number(field.percentage) > 100
                          ? _InvalidPercentage_
                          : !/^\d+(\.\d{1,2})?$/.test(field.percentage)
                          ? _InvalidDecimalPlaces_
                          : ""
                        : ""}
                    </Typography>
                  )}
                </FormControl>
              </Grid>

              {completeStuData.degreeFields.length > 1 && (
                <Grid
                  item
                  xs={12}
                  className="academic-info-form__delete-container"
                >
                  <ButtonComponent
                    label={_ButtonLabels_._DeleteDegree_}
                    variant="outlined"
                    onBtnClick={() => handleDeleteDegreeField(index)}
                  />
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>
      </Box>

      <Box className="academic-info-form__backlogs-container">
        <Grid item container>
          <Grid item xs={12}>
            {[
              {
                label: _AnyEarlierBacklogs_,
                name: "pastBackLogs",
                checked: completeStuData.checkedBox.pastBackLogs,
                value: "earlierBackLogs",
              },
              {
                label: _AnyPresentBacklogs_,
                name: "presentBackLogs",
                checked: completeStuData.checkedBox.presentBackLogs,
                value: "presentBackLogs",
              },
            ].map(({ label, name, checked, value }) => (
              <Box key={name}>
                <CheckBoxComponent
                  className="academic-info-form__backlogs-checkbox"
                  label={
                    <Typography className="academic-info-form--checkbox-label fs-18 fw-700">
                      {label}
                    </Typography>
                  }
                  checked={checked}
                  name={name}
                  value={value}
                  onChange={(event) =>
                    handleUpdateCheckedBox(name, event.target.checked)
                  }
                />
              </Box>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
}

export default AcademicInfoForm;
