import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsPieCircleComponent } from './widgets-pie-circle.component';

describe('WidgetsPieCircleComponent', () => {
  let component: WidgetsPieCircleComponent;
  let fixture: ComponentFixture<WidgetsPieCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetsPieCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsPieCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
