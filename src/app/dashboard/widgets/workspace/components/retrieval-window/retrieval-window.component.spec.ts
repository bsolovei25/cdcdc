import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrievalWindowComponent } from './retrieval-window.component';

describe('RetrievalWindowComponent', () => {
  let component: RetrievalWindowComponent;
  let fixture: ComponentFixture<RetrievalWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetrievalWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrievalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
