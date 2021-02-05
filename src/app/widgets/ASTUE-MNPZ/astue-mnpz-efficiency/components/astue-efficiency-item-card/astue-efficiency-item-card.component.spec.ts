import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueEfficiencyItemCardComponent } from './astue-efficiency-item-card.component';

describe('AstueEfficiencyItemCardComponent', () => {
    let component: AstueEfficiencyItemCardComponent;
    let fixture: ComponentFixture<AstueEfficiencyItemCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AstueEfficiencyItemCardComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AstueEfficiencyItemCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
