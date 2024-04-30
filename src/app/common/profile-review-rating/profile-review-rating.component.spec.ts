import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileReviewRatingComponent } from './profile-review-rating.component';

describe('ProfileReviewRatingComponent', () => {
  let component: ProfileReviewRatingComponent;
  let fixture: ComponentFixture<ProfileReviewRatingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileReviewRatingComponent]
    });
    fixture = TestBed.createComponent(ProfileReviewRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
