import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruncatedDiagramPercentageItemComponent } from './truncated-diagram-percentage-item.component';

describe('TruncatedPieComponent', () => {
    let component: TruncatedDiagramPercentageItemComponent;
    let fixture: ComponentFixture<TruncatedDiagramPercentageItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TruncatedDiagramPercentageItemComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TruncatedDiagramPercentageItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
