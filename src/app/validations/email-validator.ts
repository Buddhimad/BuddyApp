import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function ValidateEmail(errFields:any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let EMAIL_REGEX = /^[a-z.]+[0-9a-z]+[@][0-9a-z]+[.][0-9a-z]+$/; // Regular Expression 1

    if (control.value != undefined) {
      if (control.value.length == 0) {
        errFields.emailTxt = 'Email is required'
      }
      if (control.value.length == 0 || EMAIL_REGEX.test(control.value)) {
        return null;
      }
    } else {
      return null;
    }

    if (control.value === null) {
      return null;
    }
    errFields.emailTxt = 'Invalid Email'
    return {'emailInvalid': true};
  }
}
