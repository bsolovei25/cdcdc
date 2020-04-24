import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilOperationsComponent } from './oil-operations.component';

describe('OilOperationsComponent', () => {
  let component: OilOperationsComponent;
  let fixture: ComponentFixture<OilOperationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OilOperationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OilOperationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
