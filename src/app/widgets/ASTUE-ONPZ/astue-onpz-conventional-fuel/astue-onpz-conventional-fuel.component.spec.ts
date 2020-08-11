import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueOnpzConventionalFuelComponent } from './astue-onpz-conventional-fuel.component';

describe('AstueOnpzConventionalFuelComponent', () => {
  let component: AstueOnpzConventionalFuelComponent;
  let fixture: ComponentFixture<AstueOnpzConventionalFuelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstueOnpzConventionalFuelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstueOnpzConventionalFuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
