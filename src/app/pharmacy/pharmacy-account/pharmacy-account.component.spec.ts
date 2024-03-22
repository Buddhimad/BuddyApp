import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyAccountComponent } from './pharmacy-account.component';

describe('PharmacyAccountComponent', () => {
  let component: PharmacyAccountComponent;
  let fixture: ComponentFixture<PharmacyAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacyAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PharmacyAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
