import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouWorkspaceOperationComponent } from './sou-workspace-operation.component';

describe('SouWorkspaceOperationComponent', () => {
  let component: SouWorkspaceOperationComponent;
  let fixture: ComponentFixture<SouWorkspaceOperationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SouWorkspaceOperationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SouWorkspaceOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
