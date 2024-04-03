import {Component, Input, OnInit} from '@angular/core';
import {ControlContainer, FormBuilder, FormGroup, FormGroupDirective, Validators} from "@angular/forms";

@Component({
  selector: 'app-buddy-file-upload',
  templateUrl: './buddy-file-upload.component.html',
  styleUrls: ['./buddy-file-upload.component.css'],
})
export class BuddyFileUploadComponent implements OnInit {

  @Input() filesToUpload
  uploadFormGroup: FormGroup
  @Input() formGroupName
  @Input() topicTxt
  @Input() errMessage
  @Input() indexFU = 0
  // selectedFiles = []
  // nicFormGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder, private rootFormGroup: FormGroupDirective) {
  }

  ngOnInit() {
    this.uploadFormGroup = this.rootFormGroup.control.get(this.formGroupName) as FormGroup;
    // this.nicFormGroup = this.rootFormGroup.form;
    // console.log(this.filesToUpload)
    // this.uploadFormGroup.get(this.formControlTxt)?.setErrors({prescriptionInvalid: true});
    // this.uploadFormGroup = this._formBuilder.group({
    //   mImage: ['']
    // });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      for (let file of event.target.files) {
        let exsFile = this.filesToUpload.find(obj => {
          return obj.name === file.name
        })
        if (!exsFile) {
          // console.log(file)
          this.filesToUpload.push({
            fileObj: file,
            src: URL.createObjectURL(file)
          });
          this.uploadFormGroup.controls['mImage'].setValue(this.filesToUpload.length);
          // console.log(this.filesToUpload)
          // console.log(this.uploadFormGroup.controls['mImage'])
        }
      }
      event.target.value = ''
    }
  }

  removeImg(index) {
    this.filesToUpload.splice(index, 1);
    if (this.filesToUpload.length <= 0) {
      this.uploadFormGroup.controls['mImage'].setValue('');
    }
  }

  imgSrc
  viewImgModal = false

  viewImg(file) {
    this.imgSrc = file.src
    this.viewImgModal = true
  }

  closeImg() {
    this.viewImgModal = false
  }
}
