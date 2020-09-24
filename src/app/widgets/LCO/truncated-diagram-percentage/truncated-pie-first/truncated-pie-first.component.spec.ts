import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruncatedPieFirstComponent } from './truncated-pie-first.component';

describe('TruncatedPieComponent', () => {
    let component: TruncatedPieFirstComponent;
    let fixture: ComponentFixture<TruncatedPieFirstComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TruncatedPieFirstComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TruncatedPieFirstComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
