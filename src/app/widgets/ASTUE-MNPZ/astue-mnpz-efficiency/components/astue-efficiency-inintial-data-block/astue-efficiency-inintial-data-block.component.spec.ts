import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueEfficiencyInintialDataBlockComponent } from './astue-efficiency-inintial-data-block.component';

describe('AstueEfficiencyInintialDataBlockComponent', () => {
    let component: AstueEfficiencyInintialDataBlockComponent;
    let fixture: ComponentFixture<AstueEfficiencyInintialDataBlockComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AstueEfficiencyInintialDataBlockComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AstueEfficiencyInintialDataBlockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
