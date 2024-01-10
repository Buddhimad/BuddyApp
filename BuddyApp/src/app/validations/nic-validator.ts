import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function ValidateNIC(errFields: any): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let NIC_REGEX1 = /^[0-9]{9}[Vv]$/; // Regular Expression 1
    let NIC_REGEX2 = /^[0-9]{12}$/; // Regular Expression 1

    if (control.value != undefined) {
      if (control.value.length == 0) {
        errFields.nicTxt = 'NIC is required'
      }

      if (control.value.length == 0 || NIC_REGEX1.test(control.value) || NIC_REGEX2.test(control.value)) {
        if (NIC_REGEX1.test(control.value) && control.value.substr(control.value.length - 1, control.value.length) !== 'V') {
          control.setValue(control.value.substr(0, control.value.length - 1) + 'V')
        }
        return null;
      }
      // errFields.nicTxt = 'Invalid NIC (' + control.value.length + '/10) | (' + control.value.length + '/12)'
      errFields.nicTxt = 'Invalid NIC'
    }
    return {'nicInvalid': true};
  }
}
