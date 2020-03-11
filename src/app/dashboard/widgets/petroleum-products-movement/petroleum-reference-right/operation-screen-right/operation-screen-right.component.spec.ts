import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationScreenRightComponent } from './operation-screen-right.component';

describe('OperationScreenRightComponent', () => {
    let component: OperationScreenRightComponent;
    let fixture: ComponentFixture<OperationScreenRightComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OperationScreenRightComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OperationScreenRightComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
