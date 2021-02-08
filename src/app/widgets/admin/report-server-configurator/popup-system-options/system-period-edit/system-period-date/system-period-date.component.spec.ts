import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemPeriodDateComponent } from './system-period-date.component';

describe('SystemPeriodDateComponent', () => {
    let component: SystemPeriodDateComponent;
    let fixture: ComponentFixture<SystemPeriodDateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SystemPeriodDateComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SystemPeriodDateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
