import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApsDropdownMenuComponent } from './aps-dropdown-menu.component';

describe('ApsDropdownMenuComponent', () => {
  let component: ApsDropdownMenuComponent;
  let fixture: ComponentFixture<ApsDropdownMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApsDropdownMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApsDropdownMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
