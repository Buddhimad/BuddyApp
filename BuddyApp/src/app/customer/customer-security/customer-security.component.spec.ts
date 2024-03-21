import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerSecurityComponent } from './customer-security.component';

describe('CustomerSecurityComponent', () => {
  let component: CustomerSecurityComponent;
  let fixture: ComponentFixture<CustomerSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerSecurityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
