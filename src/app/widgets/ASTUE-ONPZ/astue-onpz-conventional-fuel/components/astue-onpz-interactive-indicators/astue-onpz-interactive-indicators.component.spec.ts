import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueOnpzInteractiveIndicatorsComponent } from './astue-onpz-interactive-indicators.component';

describe('AstueOnpzInteractiveIndicatorsComponent', () => {
  let component: AstueOnpzInteractiveIndicatorsComponent;
  let fixture: ComponentFixture<AstueOnpzInteractiveIndicatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstueOnpzInteractiveIndicatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstueOnpzInteractiveIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
