import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChildSecondComponent } from './test-child-second.component';

describe('TestChildSecondComponent', () => {
  let component: TestChildSecondComponent;
  let fixture: ComponentFixture<TestChildSecondComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestChildSecondComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestChildSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
