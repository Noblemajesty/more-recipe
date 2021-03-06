import isEmpty from 'lodash.isempty';
import Validator from 'validator';

const signupValidator = (data) => {
  const errors = {};
  if (Validator.isEmpty(data.firstName)) {
    errors.firstName = 'First Name is required';
  }
  if (!Validator.isAlpha(data.firstName)) {
    errors.firstName = 'First Name should be alphabets';
  }
  if (!Validator.isAlpha(data.firstName.charAt(0))) {
    errors.firstName = 'First Name should be alphabets';
  }
  if (!Validator.isAlpha(data.lastName)) {
    errors.lastName = 'Last Name should be alphabets';
  }
  if (!Validator.isAlpha(data.lastName.charAt(0))) {
    errors.lastName = 'Last Name should be alphabets';
  }
  if (Validator.isEmpty(data.lastName)) {
    errors.lastName = 'Last Name is required';
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }
  if (!Validator.isEmail(data.email)) {
    errors.email = 'Invalid Email';
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  if (!Validator.isLength(data.password, {
    min: 6, max: 50
  })) {
    errors.password = 'Password should be at least 6 characters';
  }
  if (Validator.isEmpty(data.confirmPassword)) {
    errors.confirmPassword = 'You need to confirm password';
  }
  if (!Validator.equals(data.password, data.confirmPassword)) {
    errors.password = 'Passwords don\'t match';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

export default signupValidator;
