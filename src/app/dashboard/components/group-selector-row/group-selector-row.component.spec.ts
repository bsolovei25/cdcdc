import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupSelectorRowComponent } from './group-selector-row.component';

describe('GroupSelectorRowComponent', () => {
  let component: GroupSelectorRowComponent;
  let fixture: ComponentFixture<GroupSelectorRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupSelectorRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupSelectorRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
