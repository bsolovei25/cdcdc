import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationParkScreenComponent } from './operation-park-screen.component';

describe('OperationParkScreenComponent', () => {
    let component: OperationParkScreenComponent;
    let fixture: ComponentFixture<OperationParkScreenComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OperationParkScreenComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OperationParkScreenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
