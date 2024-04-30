import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-profile-review-rating',
  templateUrl: './profile-review-rating.component.html',
  styleUrls: ['./profile-review-rating.component.css']
})
export class ProfileReviewRatingComponent implements OnChanges {

  // @Input() id
  @Input() appUser
  // @Input() reviews

  ngOnInit(): void {

  }

  // reviewStars = []
  totalStars = 0

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

    this.totalStars = 0
    for (let i = 0; i < 5; i++) {
      this.totalStars += this.appUser?.ratingValues[i + 1]
    }

    return reviewStars.slice()
  }

  getStarVal(val) {
    // for (let count of this.appUser?.ratingValues) {
    //   console.log(count)
    // }
    let calcVal = this.appUser?.ratingValues[val] / this.totalStars * 100
    // console.log(calcVal)
    return calcVal + '%'
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.getStars()
    // console.log(this.appUser)
  }
}
