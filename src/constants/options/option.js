import en from "../../../messages/en.json";

const {
  _AcademicInfoForm_: {
    _Options_: { _Degrees_, _Branches_, _GradingSystems_ },
  },
} = en;

const { _SelectDegree_, _BCOM_, _BE_, _BBA_, _MCOM_, _MTECH_, _MBA_ } =
  _Degrees_;

const { _FA_, _IA_, _DM_, _CS_, _IT_, _ECE_, _HR_, _ES_, _OP_ } = _Branches_;

const { _CGPA_, _PT_ } = _GradingSystems_;

export const DEGREES = [
  { value: "", label: _SelectDegree_ },
  { value: "BCOM", label: _BCOM_ },
  { value: "BE", label: _BE_ },
  { value: "BBA", label: _BBA_ },
  { value: "MCOM", label: _MCOM_ },
  { value: "MTECH", label: _MTECH_ },
  { value: "MBA", label: _MBA_ },
];

export const BRANCHES = [
  { value: "", label: _SelectDegree_ },
  { value: "FA", label: _FA_ },
  { value: "IA", label: _IA_ },
  { value: "DM", label: _DM_ },
  { value: "CS", label: _CS_ },
  { value: "IT", label: _IT_ },
  { value: "ECE", label: _ECE_ },
  { value: "HR", label: _HR_ },
  { value: "ES", label: _ES_ },
  { value: "OP", label: _OP_ },
];

export const GRADINGSYSTEMS = [
  { value: "", label: _SelectDegree_ },
  { value: "CGPA", label: _CGPA_ },
  { value: "PT", label: _PT_ },
];
