import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationScreenComponent } from './operation-screen.component';

describe('OperationScreenComponent', () => {
    let component: OperationScreenComponent;
    let fixture: ComponentFixture<OperationScreenComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OperationScreenComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OperationScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
