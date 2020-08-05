import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdMatBalanceRightComponent } from './cd-mat-balance-right.component';

describe('CdMatBalanceRightComponent', () => {
  let component: CdMatBalanceRightComponent;
  let fixture: ComponentFixture<CdMatBalanceRightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdMatBalanceRightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdMatBalanceRightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
