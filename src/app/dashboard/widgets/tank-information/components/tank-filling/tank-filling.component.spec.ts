import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TankFillingComponent } from './tank-filling.component';

describe('TankFillingComponent', () => {
  let component: TankFillingComponent;
  let fixture: ComponentFixture<TankFillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TankFillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TankFillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
