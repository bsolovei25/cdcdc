import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueEfficiencyUnitsComponent } from './astue-efficiency-units.component';

describe('AstueEfficiencyUnitsComponent', () => {
    let component: AstueEfficiencyUnitsComponent;
    let fixture: ComponentFixture<AstueEfficiencyUnitsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AstueEfficiencyUnitsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AstueEfficiencyUnitsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
