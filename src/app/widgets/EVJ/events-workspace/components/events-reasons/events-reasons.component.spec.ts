import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsReasonsComponent } from './events-reasons.component';

describe('EventsReasonsComponent', () => {
    let component: EventsReasonsComponent;
    let fixture: ComponentFixture<EventsReasonsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventsReasonsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsReasonsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
