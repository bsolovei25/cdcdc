import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsSmotrIconComponent } from './events-smotr-icon.component';

describe('EventsSmotrIconComponent', () => {
    let component: EventsSmotrIconComponent;
    let fixture: ComponentFixture<EventsSmotrIconComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventsSmotrIconComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsSmotrIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
