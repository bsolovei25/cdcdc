import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApsKpeWidgetHeaderComponent } from './aps-kpe-widget-header.component';

describe('ApsWidgetHeaderComponent', () => {
  let component: ApsKpeWidgetHeaderComponent;
  let fixture: ComponentFixture<ApsKpeWidgetHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApsKpeWidgetHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApsKpeWidgetHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
