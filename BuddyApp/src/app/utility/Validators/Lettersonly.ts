import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function lettersOnlyValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if (!value) {
      // If the value is empty, consider it valid (you can change this behavior)
      return null;
    }

    const onlyLettersRegex = /^[a-zA-Z]+$/;

    return onlyLettersRegex.test(value) ? null : { lettersOnly: true };
  };
}