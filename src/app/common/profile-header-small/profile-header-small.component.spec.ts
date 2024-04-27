import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileHeaderSmallComponent } from './profile-header-small.component';

describe('ProfileHeaderSmallComponent', () => {
  let component: ProfileHeaderSmallComponent;
  let fixture: ComponentFixture<ProfileHeaderSmallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileHeaderSmallComponent]
    });
    fixture = TestBed.createComponent(ProfileHeaderSmallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
