import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsAlertComponent } from './aws-alert.component';

describe('AwsAlertComponent', () => {
  let component: AwsAlertComponent;
  let fixture: ComponentFixture<AwsAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwsAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwsAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
