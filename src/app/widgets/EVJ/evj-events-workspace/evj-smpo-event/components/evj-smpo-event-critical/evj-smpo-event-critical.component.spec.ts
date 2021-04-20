import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjSmpoEventCriticalComponent } from './evj-smpo-event-critical.component';

describe('EvjSmpoEventCriticalComponent', () => {
  let component: EvjSmpoEventCriticalComponent;
  let fixture: ComponentFixture<EvjSmpoEventCriticalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvjSmpoEventCriticalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvjSmpoEventCriticalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
