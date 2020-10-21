import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomReportPropertiesReferenceComponent } from './custom-report-properties-reference.component';

describe('CustomReportPropertiesReferenceComponent', () => {
  let component: CustomReportPropertiesReferenceComponent;
  let fixture: ComponentFixture<CustomReportPropertiesReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomReportPropertiesReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomReportPropertiesReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
