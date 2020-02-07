import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardVerifierComponent } from './card-verifier.component';

describe('CardVerifierComponent', () => {
  let component: CardVerifierComponent;
  let fixture: ComponentFixture<CardVerifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardVerifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardVerifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
