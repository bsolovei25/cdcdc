import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsCorrectComponent } from './events-correct.component';

describe('EventsCorrectComponent', () => {
    let component: EventsCorrectComponent;
    let fixture: ComponentFixture<EventsCorrectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventsCorrectComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsCorrectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
