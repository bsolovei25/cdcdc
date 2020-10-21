import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPathEditComponent } from './system-path-edit.component';

describe('SystemPathEditComponent', () => {
  let component: SystemPathEditComponent;
  let fixture: ComponentFixture<SystemPathEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemPathEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemPathEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
