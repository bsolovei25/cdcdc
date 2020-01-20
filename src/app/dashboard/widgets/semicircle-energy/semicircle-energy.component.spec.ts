import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SemicircleEnergyComponent } from './semicircle-energy.component';

describe('SemicircleEnergyComponent', () => {
    let component: SemicircleEnergyComponent;
    let fixture: ComponentFixture<SemicircleEnergyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SemicircleEnergyComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SemicircleEnergyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
