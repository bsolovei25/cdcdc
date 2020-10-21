import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCodingFilterComponent } from './document-coding-filter.component';

describe('DocumentCodingFilterComponent', () => {
  let component: DocumentCodingFilterComponent;
  let fixture: ComponentFixture<DocumentCodingFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentCodingFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCodingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
