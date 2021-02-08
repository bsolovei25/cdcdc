import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjEventFiltersComponent } from './evj-event-filters.component';

describe('EvjEventFiltersComponent', () => {
    let component: EvjEventFiltersComponent;
    let fixture: ComponentFixture<EvjEventFiltersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EvjEventFiltersComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EvjEventFiltersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
