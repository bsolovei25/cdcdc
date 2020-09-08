import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjEventCardComponent } from './cd-event-card.component';

describe('CdEventCardComponent', () => {
  let component: EvjEventCardComponent;
  let fixture: ComponentFixture<EvjEventCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvjEventCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvjEventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
