import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderAccountSecurityComponent } from './service-provider-account-security.component';

describe('ServiceProviderAccountSecurityComponent', () => {
  let component: ServiceProviderAccountSecurityComponent;
  let fixture: ComponentFixture<ServiceProviderAccountSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProviderAccountSecurityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceProviderAccountSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
