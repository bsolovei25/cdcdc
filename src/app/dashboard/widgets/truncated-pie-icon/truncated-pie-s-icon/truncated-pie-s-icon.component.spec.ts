import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruncatedPieSIconComponent } from './truncated-pie-s-icon.component';

describe('TruncatedPieSIconComponent', () => {
    let component: TruncatedPieSIconComponent;
    let fixture: ComponentFixture<TruncatedPieSIconComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TruncatedPieSIconComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TruncatedPieSIconComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
