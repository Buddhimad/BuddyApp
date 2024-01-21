import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyPharmacyAccountComponent } from './verify-pharmacy-account.component';

describe('VerifyPharmacyAccountComponent', () => {
  let component: VerifyPharmacyAccountComponent;
  let fixture: ComponentFixture<VerifyPharmacyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyPharmacyAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerifyPharmacyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
