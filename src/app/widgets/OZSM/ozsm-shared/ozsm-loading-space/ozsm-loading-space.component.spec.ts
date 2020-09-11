import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OzsmLoadingSpaceComponent } from './ozsm-loading-space.component';

describe('OzsmVarehouseLoadingComponent', () => {
  let component: OzsmLoadingSpaceComponent;
  let fixture: ComponentFixture<OzsmLoadingSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OzsmLoadingSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OzsmLoadingSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
