import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueEfficiencyGraphDisplayComponent } from './astue-efficiency-graph-display.component';

describe('AstueEfficiencyGraphDisplayComponent', () => {
    let component: AstueEfficiencyGraphDisplayComponent;
    let fixture: ComponentFixture<AstueEfficiencyGraphDisplayComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AstueEfficiencyGraphDisplayComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AstueEfficiencyGraphDisplayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
