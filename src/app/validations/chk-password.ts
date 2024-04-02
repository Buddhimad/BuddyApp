import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export function PasswordConfirm(errFields: any, previousFormGroup?, nextFormGroup?): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    // console.log(previousFormGroup,nextFormGroup)
    // const value: string = control.value || '';
    //
    // // Check if the value contains at least one uppercase letter
    // if (!/[A-Z]/.test(value)) {
    //   // Return a validation error if the condition is not met
    //   return { uppercase: true };
    // }
    //
    // // Return null if the validation passes
    // return null;
    // pdmTxt = 'asd'
    // Access the entire FormGroup using the 'parent' property of the control
    let formGroup: FormGroup = control.parent as FormGroup;
    // console.log(formGroup)
    if (!formGroup) {
      // If the FormGroup is not found, return null
      return null;
    }

    // Access the value of the other field using its name
    let passwordValue: string = formGroup.get('password')?.value || '';
    let passwordCValue: string = formGroup.get('passwordC')?.value || '';

    if (previousFormGroup !== undefined) {
      passwordValue = previousFormGroup.get('password')?.value || '';
    }
    if (nextFormGroup !== undefined) {
      passwordCValue = nextFormGroup.get('passwordC')?.value || '';
      formGroup = nextFormGroup
    }


    // if(formGroup!==undefined){

    if (passwordCValue !== passwordValue) {
      errFields.pdmTxt = 'Password does not match'
    }
    if (passwordCValue === '') {
      errFields.pdmTxt = 'Confirm your password'
    }

    if (passwordCValue !== '' && passwordCValue !== passwordValue) {
      //     // console.log(123)
      //     this.pdmTxt = 'Password does not match'
      // if (nextFormGroup !== undefined) {
      //
      //   nextFormGroup.get('passwordC')?.markAsTouched();
      //   nextFormGroup.get('passwordC')?.setErrors({confPassword: true});
      // } else {
        formGroup.get('passwordC')?.markAsTouched();
        formGroup.get('passwordC')?.setErrors({confPassword: true});
      // }
      if (formGroup.get('passwordC') === control) {
        return {confPassword: true};
      } else {
        return null;
      }
    } else {
      formGroup.get('passwordC')?.setErrors(null);
    }
    // this.pdmTxt = 'Confirm your password'
    return null;
  }
  return null;
}
