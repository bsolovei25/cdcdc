import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SouOutStreamsComponent } from './sou-out-streams.component';

describe('SouOutStreamsComponent', () => {
  let component: SouOutStreamsComponent;
  let fixture: ComponentFixture<SouOutStreamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SouOutStreamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SouOutStreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
