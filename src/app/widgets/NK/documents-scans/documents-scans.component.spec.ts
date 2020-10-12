import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentsScansComponent } from './documents-scans.component';

describe('DocumentsScansComponent', () => {
  let component: DocumentsScansComponent;
  let fixture: ComponentFixture<DocumentsScansComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentsScansComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentsScansComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
