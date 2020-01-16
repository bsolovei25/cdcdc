import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcologySafetyComponent } from './ecology-safety.component';

describe('EcologySafetyComponent', () => {
    let component: EcologySafetyComponent;
    let fixture: ComponentFixture<EcologySafetyComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EcologySafetyComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EcologySafetyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
