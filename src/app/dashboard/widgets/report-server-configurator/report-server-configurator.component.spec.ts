import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportServerConfiguratorComponent } from './report-server-configurator.component';

describe('ReportServerConfiguratorComponent', () => {
    let component: ReportServerConfiguratorComponent;
    let fixture: ComponentFixture<ReportServerConfiguratorComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ReportServerConfiguratorComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ReportServerConfiguratorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
