import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyBillingInfoComponent } from './pharmacy-billing-info.component';

describe('PharmacyBillingInfoComponent', () => {
  let component: PharmacyBillingInfoComponent;
  let fixture: ComponentFixture<PharmacyBillingInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacyBillingInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PharmacyBillingInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
