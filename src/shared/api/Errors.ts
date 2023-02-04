export interface ValidationErrors {
  [key: string]: string,
}

export const getValidationErrorFor = (key: string, errors?: ValidationErrors) => {
  if (!errors || !errors.hasOwnProperty(key)) {
    return '';
  }

  return errors[key];
}

export const hasValidationErrorFor = (key: string, errors?: ValidationErrors) => {
  return errors && errors.hasOwnProperty(key);
}
