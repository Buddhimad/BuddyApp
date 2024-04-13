import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

let setLetter = true;

export function ValidateTelephone(errFields: any, index: any): ValidatorFn {
  // console.log(123)
  return (control: AbstractControl): ValidationErrors | null => {

    let formGroup: FormGroup = control.parent as FormGroup;
    if (!formGroup) {
      // If the FormGroup is not found, return null
      return null;
    }

    // let setLetter = true;
    // let TELEPHONE_REGEX = /^[0-9]{3}[-][0-9]{7}$/; // Regular Expression 1
    // console.log(control.value)
    let TELEPHONE_REGEX = /^[0-9]{3}[0-9]{7}$/; // Regular Expression 1
    if (control.value === '' && index > 0 || control.value === undefined && index > 0 || control.value === null && index > 0) {
      return null
    }
    if (control.value != undefined) {
      if (control.value.length > 0 && index === 0) {
        formGroup.get('contact_number_1')?.markAsTouched();
      }
      if (control.value.length > 0 && index === 1) {
        formGroup.get('contact_number_2')?.markAsTouched();
      }
      if (control.value.length == 0) {
        errFields.contactTxts[index] = 'Contact Number is required (' + control.value.length + '/10)'
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
      errFields.contactTxts[index] = 'Invalid Contact Number (' + control.value.length + '/10)'
    }
    return {'telephoneInvalid': true};
  }
}
