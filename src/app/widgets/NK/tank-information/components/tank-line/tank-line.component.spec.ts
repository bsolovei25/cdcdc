import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TankLineComponent } from './tank-line.component';

describe('TankLineComponent', () => {
  let component: TankLineComponent;
  let fixture: ComponentFixture<TankLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TankLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TankLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
