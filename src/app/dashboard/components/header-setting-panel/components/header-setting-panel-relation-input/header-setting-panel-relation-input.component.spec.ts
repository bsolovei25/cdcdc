import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSettingPanelRelationInputComponent } from './header-setting-panel-relation-input.component';

describe('HeaderSettingPanelRelationInputComponent', () => {
  let component: HeaderSettingPanelRelationInputComponent;
  let fixture: ComponentFixture<HeaderSettingPanelRelationInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSettingPanelRelationInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSettingPanelRelationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
