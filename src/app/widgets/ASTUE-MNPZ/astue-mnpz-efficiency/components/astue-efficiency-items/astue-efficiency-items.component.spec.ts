import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstueEfficiencyItemsComponent } from './astue-efficiency-items.component';

describe('AstueEfficiencyItemsComponent', () => {
    let component: AstueEfficiencyItemsComponent;
    let fixture: ComponentFixture<AstueEfficiencyItemsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AstueEfficiencyItemsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AstueEfficiencyItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
