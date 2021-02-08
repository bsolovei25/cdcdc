import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemReportSheetsComponent } from './system-report-sheets.component';

describe('SystemReportSheetsComponent', () => {
    let component: SystemReportSheetsComponent;
    let fixture: ComponentFixture<SystemReportSheetsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SystemReportSheetsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SystemReportSheetsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
