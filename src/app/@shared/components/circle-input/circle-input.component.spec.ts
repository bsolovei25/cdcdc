import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleInputComponent } from './circle-input.component';

describe('CircleInputComponent', () => {
  let component: CircleInputComponent;
  let fixture: ComponentFixture<CircleInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
