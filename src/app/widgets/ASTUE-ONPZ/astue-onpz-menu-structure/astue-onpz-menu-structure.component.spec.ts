import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueOnpzMenuStructureComponent } from './astue-onpz-menu-structure.component';

describe('AstueOnpzMenuStructureComponent', () => {
  let component: AstueOnpzMenuStructureComponent;
  let fixture: ComponentFixture<AstueOnpzMenuStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstueOnpzMenuStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstueOnpzMenuStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
