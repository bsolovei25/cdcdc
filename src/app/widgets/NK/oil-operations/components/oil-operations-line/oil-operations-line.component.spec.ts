import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilOperationsLineComponent } from './oil-operations-line.component';

describe('OilOperationsLineComponent', () => {
    let component: OilOperationsLineComponent;
    let fixture: ComponentFixture<OilOperationsLineComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OilOperationsLineComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OilOperationsLineComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
