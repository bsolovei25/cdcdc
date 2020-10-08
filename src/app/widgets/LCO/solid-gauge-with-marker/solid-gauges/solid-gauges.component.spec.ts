import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolidGaugesComponent } from './solid-gauges.component';

describe('SolidGaugesComponent', () => {
    let component: SolidGaugesComponent;
    let fixture: ComponentFixture<SolidGaugesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SolidGaugesComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SolidGaugesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
