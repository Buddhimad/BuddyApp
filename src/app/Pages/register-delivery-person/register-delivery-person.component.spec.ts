import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterDeliveryPersonComponent } from './register-delivery-person.component';

describe('RegisterDeliveryPersonComponent', () => {
  let component: RegisterDeliveryPersonComponent;
  let fixture: ComponentFixture<RegisterDeliveryPersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterDeliveryPersonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterDeliveryPersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
