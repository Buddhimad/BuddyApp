import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-buddy-file-upload',
  templateUrl: './buddy-file-upload.component.html',
  styleUrls: ['./buddy-file-upload.component.css']
})
export class BuddyFileUploadComponent implements OnInit {

  @Input() filesToUpload = []
  @Input() uploadFormGroup: FormGroup
  @Input() topicTxt
  selectedFiles = []

  constructor(private _formBuilder: FormBuilder) {
  }

  ngOnInit() {
    // this.uploadFormGroup = this._formBuilder.group({
    //   mImage: ['']
    // });
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      for (let file of event.target.files) {
        // console.log(file)
        let exsFile = this.filesToUpload.find(obj => {
          return obj.name === file.name
        })
        if (!exsFile) {
          this.filesToUpload.push(file);
          this.uploadFormGroup.controls['mImage'].setValue(this.filesToUpload.length);
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
}
