import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruncatedDiagramPercentageComponent } from './truncated-diagram-percentage.component';

describe('TruncatedPieSFirstComponent', () => {
    let component: TruncatedDiagramPercentageComponent;
    let fixture: ComponentFixture<TruncatedDiagramPercentageComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TruncatedDiagramPercentageComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TruncatedDiagramPercentageComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
