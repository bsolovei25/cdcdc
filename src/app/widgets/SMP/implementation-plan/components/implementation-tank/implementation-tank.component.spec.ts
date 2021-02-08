import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationTankComponent } from './implementation-tank.component';

describe('ImplementationTankComponent', () => {
    let component: ImplementationTankComponent;
    let fixture: ComponentFixture<ImplementationTankComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ImplementationTankComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ImplementationTankComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
