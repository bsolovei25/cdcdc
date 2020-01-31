import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyPlanProductComponent } from './daily-plan-product.component';

describe('DailyPlanProductComponent', () => {
    let component: DailyPlanProductComponent;
    let fixture: ComponentFixture<DailyPlanProductComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DailyPlanProductComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DailyPlanProductComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
