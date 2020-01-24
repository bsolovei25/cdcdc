import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWorkspaceCardComponent } from './admin-workspace-card.component';

describe('AdminWorkspaceCardComponent', () => {
  let component: AdminWorkspaceCardComponent;
  let fixture: ComponentFixture<AdminWorkspaceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWorkspaceCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWorkspaceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
