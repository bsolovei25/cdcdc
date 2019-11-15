import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineDiagramComponent } from './line-diagram.component';

describe('LineDiagramComponent', () => {
  let component: LineDiagramComponent;
  let fixture: ComponentFixture<LineDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LineDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
