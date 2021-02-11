import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsCorrectCardComponent } from './events-correct-card.component';

describe('EventsCorrectCardComponent', () => {
    let component: EventsCorrectCardComponent;
    let fixture: ComponentFixture<EventsCorrectCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventsCorrectCardComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsCorrectCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
