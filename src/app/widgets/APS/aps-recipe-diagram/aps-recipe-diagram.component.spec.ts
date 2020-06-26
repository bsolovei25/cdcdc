import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApsRecipeDiagramComponent } from './aps-recipe-diagram.component';

describe('ApsRecipeDiagramComponent', () => {
  let component: ApsRecipeDiagramComponent;
  let fixture: ComponentFixture<ApsRecipeDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApsRecipeDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApsRecipeDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
