import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueOnpzPredictorsComponent } from './astue-onpz-predictors.component';

describe('AstueOnpzPredictorsComponent', () => {
  let component: AstueOnpzPredictorsComponent;
  let fixture: ComponentFixture<AstueOnpzPredictorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstueOnpzPredictorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstueOnpzPredictorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
