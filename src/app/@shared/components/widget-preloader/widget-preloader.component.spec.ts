import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetPreloaderComponent } from './widget-preloader.component';

describe('WidgetPreloaderComponent', () => {
  let component: WidgetPreloaderComponent;
  let fixture: ComponentFixture<WidgetPreloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WidgetPreloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetPreloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
