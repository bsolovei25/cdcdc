import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminClaimsComponent } from './admin-claims.component';

describe('AdminClaimsComponent', () => {
  let component: AdminClaimsComponent;
  let fixture: ComponentFixture<AdminClaimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminClaimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
