import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouStreamsComponent } from './sou-streams.component';

describe('SouStreamsComponent', () => {
  let component: SouStreamsComponent;
  let fixture: ComponentFixture<SouStreamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SouStreamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SouStreamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
