import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacyMainComponent } from './pharmacy-main.component';

describe('ServiceProviderIndexComponent', () => {
  let component: PharmacyMainComponent;
  let fixture: ComponentFixture<PharmacyMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacyMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacyMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
