import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueOnpzTableIndicatorsComponent } from './astue-onpz-table-indicators.component';

describe('AstueOnpzTableIndicatorsComponent', () => {
  let component: AstueOnpzTableIndicatorsComponent;
  let fixture: ComponentFixture<AstueOnpzTableIndicatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AstueOnpzTableIndicatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AstueOnpzTableIndicatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
