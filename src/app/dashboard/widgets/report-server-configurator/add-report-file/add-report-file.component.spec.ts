import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReportFileComponent } from './add-report-file.component';

describe('AddReportFileComponent', () => {
  let component: AddReportFileComponent;
  let fixture: ComponentFixture<AddReportFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReportFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReportFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
