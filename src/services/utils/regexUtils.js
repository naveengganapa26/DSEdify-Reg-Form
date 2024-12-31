const validationRegex = {
  emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  personNameRegex: /^(?!.*\s{2,})([a-zA-Z-' ]{3,})$/,
  phoneNumberRegex: /^\d{10}$/,
  usnRegex: /^[A-Z0-9]{5,}$/,
  cityRegex: /^[a-zA-Z\s'.-]{3,}$/,
  percentageRegex: /^(100|[1-9]?[0-9](\.\d{0,})?)$/,
  decimal_2digitRegex: /^\d+(\.\d{3,})$/,

  decimal_page3Regex: /^\d+(\.\d{1,2})?$/,
};

export default validationRegex;
