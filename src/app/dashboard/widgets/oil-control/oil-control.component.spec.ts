import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilControllComponent } from './oil-control.component';

describe('OilControllComponent', () => {
  let component: OilControllComponent;
  let fixture: ComponentFixture<OilControllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OilControllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OilControllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
