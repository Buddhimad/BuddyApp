import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

let setLetter = true;

export function ValidatePhotoUpload(formControlTxt): ValidatorFn {
  // console.log(123)
  return (control: AbstractControl): ValidationErrors | null => {

    const formGroup: FormGroup = control.parent as FormGroup;
    // console.log(formGroup)
    if (!formGroup) {
      // If the FormGroup is not found, return null
      return null;
    }
    // console.log(formGroup.get('prescription')?.value,formGroup.get('mImage')?.value)
    // console.log(formGroup.get('mImage')?.value)
    if (formGroup.get(formControlTxt)?.value === null) {
      return null
    }

    if (formGroup.get(formControlTxt)?.value === '') {
      // formGroup.controls['prescription'].setValidators([Validators.required, ValidatePrescription]);
      // formGroup.controls['mImage'].setValidators([Validators.required, ValidatePrescription]);
      // formGroup.controls['prescription'].updateValueAndValidity();
      // formGroup.controls['mImage'].updateValueAndValidity();
      // formGroup.get('prescription')?.setErrors({prescriptionInvalid: true});
      formGroup.get(formControlTxt)?.setErrors({photoUploadInvalid: true});
      // return {'prescriptionInvalid': true};
    } else {
      // console.log(22)
      // if (formGroup.get('prescription')?.value !== null) {
      formGroup.get(formControlTxt)?.setErrors(null);
      // }
      // if (formGroup.get('mImage')?.value !== null) {
      // formGroup.get('mImage')?.setErrors(null);
      // }
      // formGroup.controls['prescription'].setValidators(null);
      // formGroup.controls['mImage'].setValidators(null);
    }

// formGroup.controls['prescription'].updateValueAndValidity();
// formGroup.controls[formControlTxt].updateValueAndValidity();
    return null;
  }
}
