import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupUserOptionsComponent } from './popup-user-options.component';

describe('PopupUserOptionsComponent', () => {
  let component: PopupUserOptionsComponent;
  let fixture: ComponentFixture<PopupUserOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupUserOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupUserOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
