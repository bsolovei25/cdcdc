import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentCodingTableComponent } from './document-coding-table.component';

describe('DocumentCodingTableComponent', () => {
  let component: DocumentCodingTableComponent;
  let fixture: ComponentFixture<DocumentCodingTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentCodingTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentCodingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
