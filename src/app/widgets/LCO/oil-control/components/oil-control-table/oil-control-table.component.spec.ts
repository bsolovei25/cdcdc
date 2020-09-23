import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilControlTableComponent } from './oil-control-table.component';

describe('OilControlTableComponent', () => {
  let component: OilControlTableComponent;
  let fixture: ComponentFixture<OilControlTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OilControlTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OilControlTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
