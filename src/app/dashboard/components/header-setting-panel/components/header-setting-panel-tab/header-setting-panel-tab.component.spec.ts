import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSettingPanelTabComponent } from './header-setting-panel-tab.component';

describe('HeaderSettingPanelTabComponent', () => {
  let component: HeaderSettingPanelTabComponent;
  let fixture: ComponentFixture<HeaderSettingPanelTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSettingPanelTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSettingPanelTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
