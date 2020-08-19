import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueOnpzProductCardComponent } from './astue-onpz-product-card.component';

describe('AstueOnpzProductCardComponent', () => {
  let component: AstueOnpzProductCardComponent;
  let fixture: ComponentFixture<AstueOnpzProductCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstueOnpzProductCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstueOnpzProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
