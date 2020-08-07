import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SouOperationalAccountingSystemComponent } from './sou-operational-accounting-system.component';

describe('SouOperationalAccountingSystemComponent', () => {
  let component: SouOperationalAccountingSystemComponent;
  let fixture: ComponentFixture<SouOperationalAccountingSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SouOperationalAccountingSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SouOperationalAccountingSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
