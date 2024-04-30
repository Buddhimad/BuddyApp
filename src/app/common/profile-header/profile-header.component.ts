import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css']
})
export class ProfileHeaderComponent implements OnInit{

  @Input() user

  ngOnInit(): void {
    // console.log(this.user)
  }

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
}
