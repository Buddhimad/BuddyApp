import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeryfyCustomerComponent } from './veryfy-customer.component';

describe('VeryfyCustomerComponent', () => {
  let component: VeryfyCustomerComponent;
  let fixture: ComponentFixture<VeryfyCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VeryfyCustomerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VeryfyCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
