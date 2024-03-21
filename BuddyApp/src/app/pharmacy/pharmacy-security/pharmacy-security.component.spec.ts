import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PharmacySecurityComponent } from './pharmacy-security.component';

describe('ServiceProviderAccountSecurityComponent', () => {
  let component: PharmacySecurityComponent;
  let fixture: ComponentFixture<PharmacySecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PharmacySecurityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PharmacySecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
