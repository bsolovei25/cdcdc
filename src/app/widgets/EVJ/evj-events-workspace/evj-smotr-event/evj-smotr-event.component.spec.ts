import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjSmotrEventComponent } from './evj-smotr-event.component';

describe('SmotrEventComponent', () => {
  let component: EvjSmotrEventComponent;
  let fixture: ComponentFixture<EvjSmotrEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvjSmotrEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvjSmotrEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
