import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationParkScreenRightComponent } from './operation-park-screen-right.component';

describe('OperationParkScreenRightComponent', () => {
    let component: OperationParkScreenRightComponent;
    let fixture: ComponentFixture<OperationParkScreenRightComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OperationParkScreenRightComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OperationParkScreenRightComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
