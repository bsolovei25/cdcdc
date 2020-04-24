import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TankFilterComponent } from './tank-filter.component';

describe('TankFilterComponent', () => {
  let component: TankFilterComponent;
  let fixture: ComponentFixture<TankFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TankFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TankFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
