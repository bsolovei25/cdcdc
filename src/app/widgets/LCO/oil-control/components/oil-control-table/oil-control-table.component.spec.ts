import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjEventCategoriesComponent } from './cd-event-categories.component';

describe('CdEventCategoriesComponent', () => {
  let component: EvjEventCategoriesComponent;
  let fixture: ComponentFixture<EvjEventCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvjEventCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvjEventCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
