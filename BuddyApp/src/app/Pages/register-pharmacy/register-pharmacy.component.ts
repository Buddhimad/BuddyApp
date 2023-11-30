import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, Validators,FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-register-pharmacy',
  standalone: true,
  imports: [CommonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './register-pharmacy.component.html',
  styleUrl: './register-pharmacy.component.css'
})
export class RegisterPharmacyComponent {
 

  constructor(private _formBuilder: FormBuilder) {
  
  }
  firstFormGroup: FormGroup = this._formBuilder.group({firstCtrl: ['']});
  secondFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});
  thirdFormGroup: FormGroup = this._formBuilder.group({secondCtrl: ['']});
  useremailFormControl = new FormControl('', [Validators.required, Validators.email]);
  value = '';
  hidepw = true;
  hidecpw = true;
}
