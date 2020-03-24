import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGroupCardComponent } from './ag-group-card.component';

describe('AgGroupCardComponent', () => {
  let component: AgGroupCardComponent;
  let fixture: ComponentFixture<AgGroupCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgGroupCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGroupCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
