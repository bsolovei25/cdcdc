import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilOperationsTankFilterComponent } from './oil-operations-tank-filter.component';

describe('OilOperationsTankFilterComponent', () => {
    let component: OilOperationsTankFilterComponent;
    let fixture: ComponentFixture<OilOperationsTankFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OilOperationsTankFilterComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OilOperationsTankFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
