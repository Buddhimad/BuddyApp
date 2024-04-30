import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-profile-header-small',
  templateUrl: './profile-header-small.component.html',
  styleUrls: ['./profile-header-small.component.css']
})
export class ProfileHeaderSmallComponent {

  @Input() appUser
  @Output() viewCustomerFunc = new EventEmitter()

  getStars(rating) {
    let reviewStars = []
    let val = Math.trunc(rating)
    for (let i = 0; i < val; i++) {
      reviewStars.push({
        rated: true
      })
    }
    for (let i = val; i < 5; i++) {
      reviewStars.push({
        rated: false
      })
    }

    // this.totalStars = 0
    // for (let i = 0; i < 5; i++) {
    //   this.totalStars += this.appUser?.ratingValues[i + 1]
    // }

    return reviewStars.slice()
  }

  viewCustomer() {
    this.viewCustomerFunc.emit(true)
  }
}
