import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemMacroEditComponent } from './system-macro-edit.component';

describe('SystemMacroEditComponent', () => {
  let component: SystemMacroEditComponent;
  let fixture: ComponentFixture<SystemMacroEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemMacroEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemMacroEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
