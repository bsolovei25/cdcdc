import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApsWidgetHeaderComponent } from './aps-widget-header.component';

describe('ApsWidgetHeaderComponent', () => {
  let component: ApsWidgetHeaderComponent;
  let fixture: ComponentFixture<ApsWidgetHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApsWidgetHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApsWidgetHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
