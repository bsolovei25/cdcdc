import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsChatComponent } from './events-chat.component';

describe('EventsChatComponent', () => {
    let component: EventsChatComponent;
    let fixture: ComponentFixture<EventsChatComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventsChatComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsChatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
