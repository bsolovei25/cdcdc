import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnergeticsComponent } from './energetics.component';

describe('EnergeticsComponent', () => {
    let component: EnergeticsComponent;
    let fixture: ComponentFixture<EnergeticsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EnergeticsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EnergeticsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
