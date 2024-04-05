import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent {

  @Input() file
  @Input() displayModal

  imgSrc
  viewImgModal = false

  viewImg(file) {
    this.imgSrc = file
    this.viewImgModal = true
  }

  closeImg() {
    this.viewImgModal = false
  }
}
