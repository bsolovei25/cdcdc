import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouWorkspaceInfoBarComponent } from './sou-workspace-info-bar.component';

describe('SouWorkspaceInfoBarComponent', () => {
  let component: SouWorkspaceInfoBarComponent;
  let fixture: ComponentFixture<SouWorkspaceInfoBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SouWorkspaceInfoBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SouWorkspaceInfoBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
