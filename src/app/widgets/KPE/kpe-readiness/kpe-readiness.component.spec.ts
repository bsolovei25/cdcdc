import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KpeDiligenceComponent } from './kpe-readiness.component';

describe('KpeDiligenceComponent', () => {
  let component: KpeDiligenceComponent;
  let fixture: ComponentFixture<KpeDiligenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KpeDiligenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KpeDiligenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
