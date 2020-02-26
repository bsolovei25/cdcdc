import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWorkerSettingsComponent } from './admin-worker-settings.component';

describe('AdminWorkerSettingsComponent', () => {
  let component: AdminWorkerSettingsComponent;
  let fixture: ComponentFixture<AdminWorkerSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminWorkerSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminWorkerSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
