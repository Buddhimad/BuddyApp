import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuddyFileUploadComponent } from './buddy-file-upload.component';

describe('BuddyFileUploadComponent', () => {
  let component: BuddyFileUploadComponent;
  let fixture: ComponentFixture<BuddyFileUploadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuddyFileUploadComponent]
    });
    fixture = TestBed.createComponent(BuddyFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
