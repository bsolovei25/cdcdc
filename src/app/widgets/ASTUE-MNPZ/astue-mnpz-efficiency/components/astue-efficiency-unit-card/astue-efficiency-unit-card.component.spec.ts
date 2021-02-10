import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueEfficiencyUnitCardComponent } from './astue-efficiency-unit-card.component';

describe('AstueEfficiencyUnitCardComponent', () => {
    let component: AstueEfficiencyUnitCardComponent;
    let fixture: ComponentFixture<AstueEfficiencyUnitCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AstueEfficiencyUnitCardComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AstueEfficiencyUnitCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
