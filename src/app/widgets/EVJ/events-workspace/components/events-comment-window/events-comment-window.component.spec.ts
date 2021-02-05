import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsCommentWindowComponent } from './events-comment-window.component';

describe('EventsCommentWindowComponent', () => {
    let component: EventsCommentWindowComponent;
    let fixture: ComponentFixture<EventsCommentWindowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventsCommentWindowComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsCommentWindowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
