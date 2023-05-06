import {
  AbstractControl,
  ValidatorFn,
  ValidationErrors,
  FormGroup,
} from '@angular/forms';

export const emailValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: string } | null => {
    const result =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        control.value
      );
    return result === true ? null : { error: 'Wrong email format' };
  };
};

export const validateSamePassword = (
  firstControlName: string,
  secondControlName: string
) => {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const { value: firstControlValue } = formGroup.get(
      firstControlName
    ) as AbstractControl;
    const { value: secondControlValue } = formGroup.get(
      secondControlName
    ) as AbstractControl;
    return firstControlValue === secondControlValue
      ? null
      : {
          passwordNotMatch: {
            firstControlValue,
            secondControlValue,
          },
        };
  };
};
