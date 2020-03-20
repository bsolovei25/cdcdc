import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsAvatarComponent } from './aws-avatar.component';

describe('AwsAvatarComponent', () => {
  let component: AwsAvatarComponent;
  let fixture: ComponentFixture<AwsAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwsAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwsAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
