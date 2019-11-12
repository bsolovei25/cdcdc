import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsPieComponent } from './widgets-pie.component';

describe('WidgetsPieComponent', () => {
  let component: WidgetsPieComponent;
  let fixture: ComponentFixture<WidgetsPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetsPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetsPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
