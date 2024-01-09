import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SPSideNavComponent } from './sp-side-nav.component';

describe('SPSideNavComponent', () => {
  let component: SPSideNavComponent;
  let fixture: ComponentFixture<SPSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SPSideNavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SPSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
