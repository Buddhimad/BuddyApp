import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

let setLetter = true;
export function ValidateTelephone(errFields:any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // let setLetter = true;
    // let TELEPHONE_REGEX = /^[0-9]{3}[-][0-9]{7}$/; // Regular Expression 1
    let TELEPHONE_REGEX = /^[0-9]{3}[0-9]{7}$/; // Regular Expression 1
    if (control.value != undefined) {
      if (control.value.length == 0) {
        errFields.contactTxt = 'Contact Number is required'
      }
      if (control.value.length == 0 || TELEPHONE_REGEX.test(control.value)) {
        return null;
      }
      if (control.value.length === 2) {
        setLetter = true;
      } else if (control.value.length === 3 && setLetter) {
        // control.setValue(control.value + '-')
      } else if (control.value.length === 4) {
        setLetter = false;
      }
    }
    errFields.contactTxt = 'Invalid Contact Number'
    return {'telephoneInvalid': true};
  }
}
