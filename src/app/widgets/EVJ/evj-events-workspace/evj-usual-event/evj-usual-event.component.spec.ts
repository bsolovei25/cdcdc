import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjUsualEventComponent } from './evj-usual-event.component';

describe('UsualEventComponent', () => {
  let component: EvjUsualEventComponent;
  let fixture: ComponentFixture<EvjUsualEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvjUsualEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvjUsualEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
