import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNoticesComponent } from './customer-notices.component';

describe('NoticesComponent', () => {
  let component: CustomerNoticesComponent;
  let fixture: ComponentFixture<CustomerNoticesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerNoticesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerNoticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
