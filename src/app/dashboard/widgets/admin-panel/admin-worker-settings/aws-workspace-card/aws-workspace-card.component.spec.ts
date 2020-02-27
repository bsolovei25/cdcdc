import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsWorkspaceCardComponent } from './aws-workspace-card.component';

describe('AwsWorkspaceCardComponent', () => {
  let component: AwsWorkspaceCardComponent;
  let fixture: ComponentFixture<AwsWorkspaceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwsWorkspaceCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwsWorkspaceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
