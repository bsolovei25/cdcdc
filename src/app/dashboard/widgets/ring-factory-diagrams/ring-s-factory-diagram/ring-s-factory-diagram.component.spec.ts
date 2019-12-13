import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RingSFactoryDiagramComponent } from './ring-s-factory-diagram.component';

describe('RingSFactoryDiagramComponent', () => {
  let component: RingSFactoryDiagramComponent;
  let fixture: ComponentFixture<RingSFactoryDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RingSFactoryDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RingSFactoryDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
