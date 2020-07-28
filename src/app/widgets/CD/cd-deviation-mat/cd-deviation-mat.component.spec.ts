import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdDeviationMatComponent } from './cd-deviation-mat.component';

describe('CdDeviationMatComponent', () => {
  let component: CdDeviationMatComponent;
  let fixture: ComponentFixture<CdDeviationMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CdDeviationMatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CdDeviationMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
