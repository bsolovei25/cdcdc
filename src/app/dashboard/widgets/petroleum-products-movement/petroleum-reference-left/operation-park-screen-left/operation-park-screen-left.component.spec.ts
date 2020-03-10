import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationParkScreenLeftComponent } from './operation-park-screen-left.component';

describe('OperationParkScreenLeftComponent', () => {
    let component: OperationParkScreenLeftComponent;
    let fixture: ComponentFixture<OperationParkScreenLeftComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OperationParkScreenLeftComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OperationParkScreenLeftComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
