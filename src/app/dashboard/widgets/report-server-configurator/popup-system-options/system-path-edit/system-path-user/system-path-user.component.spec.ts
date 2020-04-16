import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPathUserComponent } from './system-path-user.component';

describe('SystemPathUserComponent', () => {
  let component: SystemPathUserComponent;
  let fixture: ComponentFixture<SystemPathUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemPathUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemPathUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
