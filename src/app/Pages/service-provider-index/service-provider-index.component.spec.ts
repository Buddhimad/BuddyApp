import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProviderIndexComponent } from './service-provider-index.component';

describe('ServiceProviderIndexComponent', () => {
  let component: ServiceProviderIndexComponent;
  let fixture: ComponentFixture<ServiceProviderIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceProviderIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceProviderIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
