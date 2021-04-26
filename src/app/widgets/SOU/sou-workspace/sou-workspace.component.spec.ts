import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouWorkspaceComponent } from './sou-workspace.component';

describe('SouWorkspaceComponent', () => {
  let component: SouWorkspaceComponent;
  let fixture: ComponentFixture<SouWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SouWorkspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SouWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
