import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdMatBalanceComponent } from './cd-mat-balance.component';

describe('CdMatBalanceComponent', () => {
  let component: CdMatBalanceComponent;
  let fixture: ComponentFixture<CdMatBalanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdMatBalanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdMatBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
