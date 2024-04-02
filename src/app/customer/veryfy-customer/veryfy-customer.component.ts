import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatNativeDateModule} from '@angular/material/core';
import {SharedService} from "../../common/shared-service.service";
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {ValidateTelephone} from "../../validations/telephone-validator";
import {ValidatePrescription} from "../../validations/prescription-validator";
import {ValidatePhotoUpload} from "../../validations/photo-upload-validator";

@Component({
  selector: 'app-veryfy-customer',
  // standalone: true,
  // imports: [CommonModule,MatDatepickerModule,MatButtonModule,MatExpansionModule,MatFormFieldModule,MatIconModule,MatInputModule,MatNativeDateModule],
  templateUrl: './veryfy-customer.component.html',
  styleUrls: ['./veryfy-customer.component.css']
})
export class VeryfyCustomerComponent implements OnInit {
  step = 0;

  selectedFilesNIC = []
  selectedFilesLocation = []

  firstFormGroup
  secondFormGroup

  user;

  constructor(private sharedService: SharedService, private _formBuilder: FormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.user = this.sharedService.getUserByLS()
    this.firstFormGroup = this._formBuilder.group({
      nicFormGroup: this._formBuilder.group({
        mImage: ['', Validators.required],
        // balla: ['', Validators.required]
      })
    });
    this.secondFormGroup = this._formBuilder.group({
      locationFormGroup: this._formBuilder.group({
        mImage: ['', [Validators.required]],
        // puusa: ['', Validators.required]
      })
    });
    // this.firstFormGroup.get('mImageNIC')?.setErrors({prescriptionInvalid: true});
  }

  onSubmit(e: any) {
    const formData = new FormData();
    formData.append('id', this.sharedService.getUserIdByLS());
    // formData.append('images', this.selectedFiles);
    // console.log(this.selectedFiles)
    // if (this.selectedFiles.length === 0) {
    //   console.log(11)
    //   formData.append('images', null);
    // }
    for (let file of this.selectedFilesNIC) {
      formData.append('imagesNIC', file);
    }
    for (let file of this.selectedFilesLocation) {
      formData.append('imagesLocation', file);
    }
    // console.log(JSON.stringify(c_notice))
    // console.log(formData.get('notice'))
    this.http.post(this.sharedService.publicUrl + 'customer/verify_customer_images', formData).subscribe((notice) => {
      this.resetForm()
      // this.myStepper.next();
      //   // this.patient.patientId = patient.patientId;
      //   // this.success = 1;
    }, (error) => {
      console.log(error)
      //   // this.success = 2;
    })
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep(e, index) {
    e.preventDefault()
    // console.log(e)
    this.firstFormGroup.get('nicFormGroup.mImage').markAsTouched({onlySelf: true});
    if (index === 1) {
      this.secondFormGroup.get('locationFormGroup.mImage').markAsTouched({onlySelf: true});
    }
    if (this.firstFormGroup.valid && this.step === 0) {
      this.step++;
    } else if (this.secondFormGroup.valid && this.step === 1) {
      this.onSubmit(e)
      // this.step++;
    }
  }

  prevStep() {
    this.step--;
  }

  @ViewChild('firstFormDirective') firstFormDirective
  @ViewChild('secondFormDirective') secondFormDirective

  resetForm() {
    this.step = 0
    this.selectedFilesNIC = []
    this.selectedFilesLocation = []
    this.firstFormGroup.reset()
    this.secondFormGroup.reset()
    this.firstFormDirective.resetForm()
    this.secondFormDirective.resetForm()
  }
}
