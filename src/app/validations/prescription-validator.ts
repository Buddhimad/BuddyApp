import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

let setLetter = true;

export function ValidatePrescription(): ValidatorFn {
  // console.log(123)
  return (control: AbstractControl): ValidationErrors | null => {

    let formGroup: FormGroup = control.root as FormGroup;
    // console.log(formGroup)
    if (!formGroup) {
      // If the FormGroup is not found, return null
      return null;
    }
    // console.log(formGroup.get('prescription')?.value,formGroup.get('imageUploadFormGroup.mImage')?.value)
    // console.log(formGroup.get('imageUploadFormGroup.mImage')?.value)
    if (formGroup.get('prescription')?.value === null && formGroup.get('imageUploadFormGroup.mImage')?.value === null) {
      return null
    }

    if (formGroup.get('prescription')?.value === '' && formGroup.get('imageUploadFormGroup.mImage')?.value === '' ||
      formGroup.get('prescription')?.value === null && formGroup.get('imageUploadFormGroup.mImage')?.value === '' ||
      formGroup.get('prescription')?.value === '' && formGroup.get('imageUploadFormGroup.mImage')?.value === null) {
      // formGroup.controls['prescription'].setValidators([Validators.required, ValidatePrescription]);
      // formGroup.controls['imageUploadFormGroup.mImage'].setValidators([Validators.required, ValidatePrescription]);
      // formGroup.controls['prescription'].updateValueAndValidity();
      // formGroup.controls['imageUploadFormGroup.mImage'].updateValueAndValidity();
      formGroup.get('prescription')?.setErrors({prescriptionInvalid: true});
      formGroup.get('imageUploadFormGroup.mImage')?.setErrors({prescriptionInvalid: true});
      // return {'prescriptionInvalid': true};
    } else {
      // console.log(22)
      // if (formGroup.get('prescription')?.value !== null) {
      formGroup.get('prescription')?.setErrors(null);
      // }
      // if (formGroup.get('imageUploadFormGroup.mImage')?.value !== null) {
      formGroup.get('imageUploadFormGroup.mImage')?.setErrors(null);
      // }
      // formGroup.controls['prescription'].setValidators(null);
      // formGroup.controls['imageUploadFormGroup.mImage'].setValidators(null);
    }

// formGroup.controls['prescription'].updateValueAndValidity();
// formGroup.controls['imageUploadFormGroup.mImage'].updateValueAndValidity();
    return null;
  }
}
