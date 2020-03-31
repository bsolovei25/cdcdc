import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgAlertSubmitComponent } from './ag-alert-submit.component';

describe('AgAlertSubmitComponent', () => {
  let component: AgAlertSubmitComponent;
  let fixture: ComponentFixture<AgAlertSubmitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgAlertSubmitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgAlertSubmitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
