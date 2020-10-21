import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportFileSelectBoxComponent } from './report-file-select-box.component';

describe('ReportFileSelectBoxComponent', () => {
  let component: ReportFileSelectBoxComponent;
  let fixture: ComponentFixture<ReportFileSelectBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportFileSelectBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportFileSelectBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
