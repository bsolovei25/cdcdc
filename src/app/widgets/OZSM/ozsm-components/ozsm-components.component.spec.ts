import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OzsmComponentsComponent } from './ozsm-components.component';

describe('OzsmComponentsComponent', () => {
  let component: OzsmComponentsComponent;
  let fixture: ComponentFixture<OzsmComponentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OzsmComponentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OzsmComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
