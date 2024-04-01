import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountInfoqqComponent } from './account-infoqq.component';

describe('AccountInfoqqComponent', () => {
  let component: AccountInfoqqComponent;
  let fixture: ComponentFixture<AccountInfoqqComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccountInfoqqComponent]
    });
    fixture = TestBed.createComponent(AccountInfoqqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
