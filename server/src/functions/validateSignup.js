import validator from 'validator';
import isEmpty from 'lodash.isempty';

const validateSignUp = (input) => {
  const errors = {};
  if (validator.isEmpty(input.firstname)) {
    errors.firstname = 'First name is empty!';
  }
  if (validator.isBoolean(input.firstname)) {
    errors.firstname = 'First name should be alphabets';
  }
  if (validator.isBoolean(input.lastname)) {
    errors.lastname = 'Last name should be alphabets';
  }
  if (!(validator.isAlpha(input.firstname))) {
    errors.firstname = 'First name should be alphabets';
  }
  if (validator.isBoolean(input.email)) {
    errors.email = 'Email should be in format \'youremail@example.com\'';
  }
  if (validator.isEmpty(input.lastname)) {
    errors.lastname = 'Last name is empty!';
  }
  if (!(validator.isAlpha(input.lastname))) {
    errors.lastname = 'Last name should be alphabets';
  }
  if (validator.isEmpty(input.email)) {
    errors.email = 'Email is empty!';
  }
  if (!(validator.isEmail(input.email))) {
    errors.email = 'Email is invalid!';
  }
  if (validator.isEmpty(input.password)) {
    errors.password = 'Password field is empty';
  }
  if (!validator.isLength(input.password, { min: 5, max: 100 })) {
    errors.password = 'Password must be minimum of 5 characters';
  }
  if (validator.isEmpty(input.confirmPassword)) {
    errors.confirmPassword = 'ConfirmPassword field is empty!';
  }
  if (!validator.equals(input.password, input.confirmPassword)) {
    errors.confirmPassword = 'Passwords don\'t match';
  }
  return {
    errors,
    isvalid: isEmpty(errors)
  };
};

export default validateSignUp;