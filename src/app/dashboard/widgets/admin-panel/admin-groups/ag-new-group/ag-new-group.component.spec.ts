import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgNewGroupComponent } from './ag-new-group.component';

describe('AgNewGroupComponent', () => {
  let component: AgNewGroupComponent;
  let fixture: ComponentFixture<AgNewGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgNewGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgNewGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
