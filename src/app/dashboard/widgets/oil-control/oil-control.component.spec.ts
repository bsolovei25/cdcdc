import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilControlComponent } from './oil-control.component';

describe('OilControllComponent', () => {
  let component: OilControlComponent;
  let fixture: ComponentFixture<OilControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OilControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OilControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
