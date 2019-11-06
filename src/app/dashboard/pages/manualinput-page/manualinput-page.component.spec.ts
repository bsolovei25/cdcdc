import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualinputPageComponent } from './manualinput-page.component';

describe('ManualinputPageComponent', () => {
  let component: ManualinputPageComponent;
  let fixture: ComponentFixture<ManualinputPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManualinputPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualinputPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
