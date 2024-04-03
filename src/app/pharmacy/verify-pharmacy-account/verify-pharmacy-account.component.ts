import {Component, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatNativeDateModule} from '@angular/material/core';
import {FormBuilder, Validators} from "@angular/forms";
import {SharedService} from "../../common/shared-service.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-verify-pharmacy-account',
  // standalone: true,
  // imports: [CommonModule,MatDatepickerModule,MatButtonModule,MatExpansionModule,MatFormFieldModule,MatIconModule,MatInputModule,MatNativeDateModule],
  templateUrl: './verify-pharmacy-account.component.html',
  styleUrls: ['./verify-pharmacy-account.component.css']
})
export class VerifyPharmacyAccountComponent implements OnInit {
  step = 0;

  firstFormGroup
  secondFormGroup

  selectedFilesBills = []
  selectedFilesBR = []
  selectedFilesPharmacyPhotos = []

  selectedFilesNIC = []
  selectedFilesLocation = []

  user;

  constructor(private sharedService: SharedService, private _formBuilder: FormBuilder, private http: HttpClient) {
  }

  ngOnInit(): void {
    this.user = this.sharedService.getUserByLS()
    this.firstFormGroup = this._formBuilder.group({
      billFormGroup: this._formBuilder.group({
        mImage: ['', Validators.required],
      }),
      brFormGroup: this._formBuilder.group({
        mImage: ['', Validators.required],
      }),
      pharmacyPhotoFormGroup: this._formBuilder.group({
        mImage: ['', Validators.required],
      })
    });
    this.secondFormGroup = this._formBuilder.group({
      nicFormGroup: this._formBuilder.group({
        mImage: ['', Validators.required],
      }),
      locationFormGroup: this._formBuilder.group({
        mImage: ['', Validators.required],
      })
    });
    // this.firstFormGroup.get('mImageNIC')?.setErrors({prescriptionInvalid: true});
  }

  onSubmit(e, index) {
    const formData = new FormData();
    formData.append('id', this.sharedService.getUserIdByLS());
    // formData.append('images', this.selectedFiles);
    // console.log(this.selectedFiles)
    // if (this.selectedFiles.length === 0) {
    //   console.log(11)
    //   formData.append('images', null);
    // }
    if (index === 0) {
      for (let file of this.selectedFilesBills) {
        formData.append('imagesBills', file.fileObj);
      }
      for (let file of this.selectedFilesBR) {
        formData.append('imagesBR', file.fileObj);
      }
      for (let file of this.selectedFilesPharmacyPhotos) {
        formData.append('imagesPharmacyPhotos', file.fileObj);
      }
      // console.log(JSON.stringify(c_notice))
      // console.log(formData.get('notice'))
      this.http.post(this.sharedService.publicUrl + 'pharmacy/verify_pharmacy', formData).subscribe((notice) => {
        this.resetForm(index)
        // this.myStepper.next();
        //   // this.patient.patientId = patient.patientId;
        //   // this.success = 1;
      }, (error) => {
        console.log(error)
        //   // this.success = 2;
      })
    } else if (index === 1) {
      for (let file of this.selectedFilesNIC) {
        formData.append('imagesNIC', file.fileObj);
      }
      for (let file of this.selectedFilesLocation) {
        formData.append('imagesLocation', file.fileObj);
      }
      // console.log(JSON.stringify(c_notice))
      // console.log(formData.get('notice'))
      this.http.post(this.sharedService.publicUrl + 'pharmacy/verify_pharmacy_owner', formData).subscribe((notice) => {
        this.resetForm(index)
        // this.myStepper.next();
        //   // this.patient.patientId = patient.patientId;
        //   // this.success = 1;
      }, (error) => {
        console.log(error)
        //   // this.success = 2;
      })
    }
  }

  nextStep(e, index) {
    e.preventDefault()
    // console.log(e)
    this.firstFormGroup.get('billFormGroup.mImage').markAsTouched({onlySelf: true});
    this.firstFormGroup.get('brFormGroup.mImage').markAsTouched({onlySelf: true});
    this.firstFormGroup.get('pharmacyPhotoFormGroup.mImage').markAsTouched({onlySelf: true});
    if (index === 1) {
      this.secondFormGroup.get('nicFormGroup.mImage').markAsTouched({onlySelf: true});
      this.secondFormGroup.get('locationFormGroup.mImage').markAsTouched({onlySelf: true});
    }
    if (this.firstFormGroup.valid) {
      this.onSubmit(e, 0)
      // this.step++;
    } else if (this.secondFormGroup.valid) {
      this.onSubmit(e, 1)
      // this.step++;
    }
  }

  @ViewChild('firstFormDirective') firstFormDirective
  @ViewChild('secondFormDirective') secondFormDirective

  resetForm(index) {
    // this.step = 0
    if (index === 0) {
      this.selectedFilesBills = []
      this.selectedFilesBR = []
      this.selectedFilesPharmacyPhotos = []
      this.firstFormGroup.reset()
      this.firstFormDirective.resetForm()
    } else if (index === 1) {
      this.selectedFilesNIC = []
      this.selectedFilesLocation = []
      this.secondFormGroup.reset()
      this.secondFormDirective.resetForm()
    }
  }

  prevStep() {
    this.step--;
  }

  setStep(index: number) {
    // if (index === 0) {
    //
    // }
    this.step = index;
  }

}
