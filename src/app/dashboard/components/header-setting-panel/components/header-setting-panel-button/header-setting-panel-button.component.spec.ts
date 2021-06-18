import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSettingPanelButtonComponent } from './header-setting-panel-button.component';

describe('HeaderSettingPanelButtonComponent', () => {
  let component: HeaderSettingPanelButtonComponent;
  let fixture: ComponentFixture<HeaderSettingPanelButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderSettingPanelButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSettingPanelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
