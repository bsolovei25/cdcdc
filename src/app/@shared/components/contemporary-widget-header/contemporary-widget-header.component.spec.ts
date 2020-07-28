import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContemporaryWidgetHeaderComponent } from './contemporary-widget-header.component';

describe('ApsWidgetHeaderComponent', () => {
  let component: ContemporaryWidgetHeaderComponent;
  let fixture: ComponentFixture<ContemporaryWidgetHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContemporaryWidgetHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContemporaryWidgetHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
