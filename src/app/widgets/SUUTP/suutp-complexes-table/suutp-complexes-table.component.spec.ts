import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuutpComplexesTableComponent } from './suutp-complexes-table.component';

describe('SuutpComplexesTableComponent', () => {
  let component: SuutpComplexesTableComponent;
  let fixture: ComponentFixture<SuutpComplexesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuutpComplexesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuutpComplexesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
