import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueEfficiencyTableDisplayComponent } from './astue-efficiency-table-display.component';

describe('AstueEfficiencyTableDisplayComponent', () => {
    let component: AstueEfficiencyTableDisplayComponent;
    let fixture: ComponentFixture<AstueEfficiencyTableDisplayComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AstueEfficiencyTableDisplayComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AstueEfficiencyTableDisplayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
