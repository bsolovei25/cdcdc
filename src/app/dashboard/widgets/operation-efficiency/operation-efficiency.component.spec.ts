import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationEfficiencyComponent } from './operation-efficiency.component';

describe('OperationEfficiencyComponent', () => {
    let component: OperationEfficiencyComponent;
    let fixture: ComponentFixture<OperationEfficiencyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OperationEfficiencyComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OperationEfficiencyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
