import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsCardComponent } from './aws-card.component';

describe('AwsCardComponent', () => {
  let component: AwsCardComponent;
  let fixture: ComponentFixture<AwsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
