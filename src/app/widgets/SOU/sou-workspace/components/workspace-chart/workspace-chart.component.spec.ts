import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceChartComponent } from './workspace-chart.component';

describe('WorkspaceChartComponent', () => {
  let component: WorkspaceChartComponent;
  let fixture: ComponentFixture<WorkspaceChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkspaceChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
