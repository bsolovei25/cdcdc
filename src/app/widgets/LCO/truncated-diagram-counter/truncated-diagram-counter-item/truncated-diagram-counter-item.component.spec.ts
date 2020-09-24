import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruncatedDiagramCounterItemComponent } from './truncated-diagram-counter-item.component';

describe('TruncatedPieIconComponent', () => {
    let component: TruncatedDiagramCounterItemComponent;
    let fixture: ComponentFixture<TruncatedDiagramCounterItemComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TruncatedDiagramCounterItemComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TruncatedDiagramCounterItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
