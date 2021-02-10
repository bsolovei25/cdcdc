import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomReportOptionsComponent } from './custom-report-options.component';

describe('CustomReportOptionsComponent', () => {
    let component: CustomReportOptionsComponent;
    let fixture: ComponentFixture<CustomReportOptionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CustomReportOptionsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomReportOptionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
