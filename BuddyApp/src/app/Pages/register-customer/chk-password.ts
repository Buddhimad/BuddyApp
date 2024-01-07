import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn} from "@angular/forms";

export function PasswordConfirm(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
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
    const formGroup: FormGroup = control.parent as FormGroup;
    // console.log(formGroup)
    if (!formGroup) {
      // If the FormGroup is not found, return null
      return null;
    }

    // Access the value of the other field using its name
    const passwordValue: string = formGroup.get('password')?.value || '';
    const passwordCValue: string = formGroup.get('passwordC')?.value || '';


    // if(formGroup!==undefined){
    //   console.log(control.value,otherFieldValue)
    if (passwordCValue !== '' && passwordCValue !== passwordValue) {
      // this.pdmTxt = 'Password does not match'
      formGroup.get('passwordC')?.markAsTouched();
      formGroup.get('passwordC')?.setErrors({confPassword: true});
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
    // }
    // return null;
  };
}
