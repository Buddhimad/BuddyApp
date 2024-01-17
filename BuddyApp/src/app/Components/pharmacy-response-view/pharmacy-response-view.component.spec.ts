import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyResponseViewComponent } from './pharmacy-response-view.component';

describe('PharmacyResponseViewComponent', () => {
  let component: PharmacyResponseViewComponent;
  let fixture: ComponentFixture<PharmacyResponseViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacyResponseViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PharmacyResponseViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
