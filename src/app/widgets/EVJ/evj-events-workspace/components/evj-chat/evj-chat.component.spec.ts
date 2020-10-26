import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjChatComponent } from './evj-chat.component';

describe('ChatComponent', () => {
  let component: EvjChatComponent;
  let fixture: ComponentFixture<EvjChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EvjChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EvjChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
