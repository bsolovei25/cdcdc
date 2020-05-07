import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCodingTableRecordComponent } from './document-coding-table-record.component';

describe('DocumentCodingTableRecordComponent', () => {
  let component: DocumentCodingTableRecordComponent;
  let fixture: ComponentFixture<DocumentCodingTableRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentCodingTableRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCodingTableRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
