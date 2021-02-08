import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsWorkspaceComponent } from './events-workspace.component';

describe('EventsWorkspaceComponent', () => {
    let component: EventsWorkspaceComponent;
    let fixture: ComponentFixture<EventsWorkspaceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventsWorkspaceComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsWorkspaceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
