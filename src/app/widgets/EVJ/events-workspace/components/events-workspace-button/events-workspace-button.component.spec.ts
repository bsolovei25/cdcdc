import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsWorkspaceButtonComponent } from './events-workspace-button.component';

describe('EventsWorkspaceButtonComponent', () => {
    let component: EventsWorkspaceButtonComponent;
    let fixture: ComponentFixture<EventsWorkspaceButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EventsWorkspaceButtonComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EventsWorkspaceButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
