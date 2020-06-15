import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueEfficiencyComponent } from './astue-efficiency.component';

describe('AstueEfficiencyComponent', () => {
  let component: AstueEfficiencyComponent;
  let fixture: ComponentFixture<AstueEfficiencyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstueEfficiencyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstueEfficiencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
