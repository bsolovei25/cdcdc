import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruncatedPieComponent } from './truncated-pie-first.component';

describe('TruncatedPieComponent', () => {
  let component: TruncatedPieComponent;
  let fixture: ComponentFixture<TruncatedPieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruncatedPieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruncatedPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
