import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueEfficiencyCalculationComponent } from './astue-efficiency-calculation.component';

describe('AstueEfficiencyCalculationComponent', () => {
    let component: AstueEfficiencyCalculationComponent;
    let fixture: ComponentFixture<AstueEfficiencyCalculationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AstueEfficiencyCalculationComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AstueEfficiencyCalculationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
