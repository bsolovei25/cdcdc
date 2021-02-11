import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjEventsCommentWindowComponent } from './evj-events-comment-window.component';

describe('EventsCommentWindowComponent', () => {
    let component: EvjEventsCommentWindowComponent;
    let fixture: ComponentFixture<EvjEventsCommentWindowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EvjEventsCommentWindowComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EvjEventsCommentWindowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
