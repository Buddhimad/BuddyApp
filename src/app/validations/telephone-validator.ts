import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

let setLetter = true;

export function ValidateTelephone(errFields: any, index: any): ValidatorFn {
  // console.log(123)
  return (control: AbstractControl): ValidationErrors | null => {
    // let setLetter = true;
    // let TELEPHONE_REGEX = /^[0-9]{3}[-][0-9]{7}$/; // Regular Expression 1
    // console.log(1,control.value)
    let TELEPHONE_REGEX = /^[0-9]{3}[0-9]{7}$/; // Regular Expression 1
    if ((control.value != undefined && control.value === '') && index === 0) {
      return null
    }
    if (control.value != undefined) {
      if (control.value.length == 0) {
        errFields.contactTxts[index] = 'Contact Number is required'
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
    errFields.contactTxts[index] = 'Invalid Contact Number'
    return {'telephoneInvalid': true};
  }
}
