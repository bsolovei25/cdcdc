import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruncatedPieSFirstComponent } from './truncated-pie-s-first.component';

describe('TruncatedPieSFirstComponent', () => {
    let component: TruncatedPieSFirstComponent;
    let fixture: ComponentFixture<TruncatedPieSFirstComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TruncatedPieSFirstComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TruncatedPieSFirstComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
