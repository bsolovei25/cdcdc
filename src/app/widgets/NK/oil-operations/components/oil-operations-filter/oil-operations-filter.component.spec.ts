import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilOperationsFilterComponent } from './oil-operations-filter.component';

describe('OilOperationsFilterComponent', () => {
    let component: OilOperationsFilterComponent;
    let fixture: ComponentFixture<OilOperationsFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OilOperationsFilterComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OilOperationsFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
