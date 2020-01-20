import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruncatedPieIconComponent } from './truncated-pie-icon.component';

describe('TruncatedPieIconComponent', () => {
    let component: TruncatedPieIconComponent;
    let fixture: ComponentFixture<TruncatedPieIconComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TruncatedPieIconComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TruncatedPieIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
