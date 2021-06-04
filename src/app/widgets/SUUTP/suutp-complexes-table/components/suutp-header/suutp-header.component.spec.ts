import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuutpHeaderComponent } from './suutp-header.component';

describe('SuutpHeaderComponent', () => {
  let component: SuutpHeaderComponent;
  let fixture: ComponentFixture<SuutpHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuutpHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuutpHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
