import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjEventsResponsibleSelectComponent } from './evj-events-responsible-select.component';

describe('EventsResponsibleSelectComponent', () => {
    let component: EvjEventsResponsibleSelectComponent;
    let fixture: ComponentFixture<EvjEventsResponsibleSelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EvjEventsResponsibleSelectComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EvjEventsResponsibleSelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
