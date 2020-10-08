import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationScreenLeftComponent } from './operation-screen-left.component';

describe('OperationScreenLeftComponent', () => {
    let component: OperationScreenLeftComponent;
    let fixture: ComponentFixture<OperationScreenLeftComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OperationScreenLeftComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OperationScreenLeftComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
