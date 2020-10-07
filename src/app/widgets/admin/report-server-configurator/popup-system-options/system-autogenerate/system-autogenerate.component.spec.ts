import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemAutogenerateComponent } from './system-autogenerate.component';

describe('SystemAutogenerateComponent', () => {
  let component: SystemAutogenerateComponent;
  let fixture: ComponentFixture<SystemAutogenerateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemAutogenerateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemAutogenerateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
