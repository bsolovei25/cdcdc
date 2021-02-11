import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjEventsSmotrIconComponent } from './evj-events-smotr-icon.component';

describe('EventsSmotrIconComponent', () => {
    let component: EvjEventsSmotrIconComponent;
    let fixture: ComponentFixture<EvjEventsSmotrIconComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EvjEventsSmotrIconComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EvjEventsSmotrIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
