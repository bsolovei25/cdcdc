import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueEfficiencyInitialDataComponent } from './astue-efficiency-initial-data.component';

describe('AstueEfficiencyInitialDataComponent', () => {
    let component: AstueEfficiencyInitialDataComponent;
    let fixture: ComponentFixture<AstueEfficiencyInitialDataComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AstueEfficiencyInitialDataComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AstueEfficiencyInitialDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
