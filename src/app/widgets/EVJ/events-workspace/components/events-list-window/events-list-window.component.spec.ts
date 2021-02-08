import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsListWindowComponent } from './events-list-window.component';

describe('EventsListWindowComponent', () => {
    let component: EventsListWindowComponent;
    let fixture: ComponentFixture<EventsListWindowComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventsListWindowComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsListWindowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
