import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorSelectorComponent } from './indicator-selector.component';

describe('IndicatorSelectorComponent', () => {
  let component: IndicatorSelectorComponent;
  let fixture: ComponentFixture<IndicatorSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
