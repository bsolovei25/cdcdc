import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TankInformationComponent } from './tank-information.component';

describe('TankInformationComponent', () => {
    let component: TankInformationComponent;
    let fixture: ComponentFixture<TankInformationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TankInformationComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TankInformationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
