import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueOnpzMainIndicatorsComponent } from './astue-onpz-main-indicators.component';

describe('AstueOnpzMainIndicatorsComponent', () => {
  let component: AstueOnpzMainIndicatorsComponent;
  let fixture: ComponentFixture<AstueOnpzMainIndicatorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstueOnpzMainIndicatorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstueOnpzMainIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
