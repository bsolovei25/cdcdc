import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSettingPanelComponent } from './header-setting-panel.component';

describe('HeaderSettingPanelComponent', () => {
  let component: HeaderSettingPanelComponent;
  let fixture: ComponentFixture<HeaderSettingPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSettingPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSettingPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
