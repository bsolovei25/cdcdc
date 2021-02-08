import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPeriodDateYearComponent } from './system-period-date-year.component';

describe('SystemPeriodDateYearComponent', () => {
    let component: SystemPeriodDateYearComponent;
    let fixture: ComponentFixture<SystemPeriodDateYearComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SystemPeriodDateYearComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SystemPeriodDateYearComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
