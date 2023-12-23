import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-create-notice',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './create-notice.component.html',
  styleUrl: './create-notice.component.css',
})
export class CreateNoticeComponent {
  selectedNoticeType: any='pharmacy_notice';
  selected_package_type:any;
  selected_suitable_vehicle_type:any;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
    noticetypeselector:['',Validators.required]
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: '',
    searching_provinceFormControl:['',Validators.required],
    searching_districtFormControl:['',Validators.required],
    searching_townFormControl:['',Validators.required]
  });
  isOptional = false;

  constructor(private _formBuilder: FormBuilder) {}
  // {value: 'delivery_notice', viewValue: 'Delivery Notice'}
 
  notice_types: any[] = [
    {value: 'pharmacy_notice', viewValue: 'Pharmacy Notice'}
  ];

  print(noticetype:any){
    console.log(noticetype);
  }

}
