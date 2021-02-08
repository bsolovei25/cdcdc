import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OilOperationsLineMenuComponent } from './oil-operations-line-menu.component';

describe('OilOperationsLineMenuComponent', () => {
    let component: OilOperationsLineMenuComponent;
    let fixture: ComponentFixture<OilOperationsLineMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OilOperationsLineMenuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OilOperationsLineMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
