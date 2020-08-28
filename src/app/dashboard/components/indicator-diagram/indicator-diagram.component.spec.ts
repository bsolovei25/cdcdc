import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndicatorDiagramComponent } from './indicator-diagram.component';

describe('IndicatorDiagramComponent', () => {
  let component: IndicatorDiagramComponent;
  let fixture: ComponentFixture<IndicatorDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndicatorDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicatorDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
