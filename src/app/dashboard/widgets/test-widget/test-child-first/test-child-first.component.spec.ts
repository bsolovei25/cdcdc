import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestChildFirstComponent } from './test-child-first.component';

describe('TestChildFirstComponent', () => {
  let component: TestChildFirstComponent;
  let fixture: ComponentFixture<TestChildFirstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestChildFirstComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestChildFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
