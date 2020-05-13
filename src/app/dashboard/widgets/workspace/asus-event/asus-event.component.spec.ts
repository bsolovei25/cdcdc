import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AsusEventComponent } from './asus-event.component';

describe('AsusEventComponent', () => {
  let component: AsusEventComponent;
  let fixture: ComponentFixture<AsusEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AsusEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AsusEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
