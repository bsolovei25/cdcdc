import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruncatedDiagramCounterComponent } from './truncated-diagram-counter.component';

describe('TruncatedPieSIconComponent', () => {
    let component: TruncatedDiagramCounterComponent;
    let fixture: ComponentFixture<TruncatedDiagramCounterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TruncatedDiagramCounterComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TruncatedDiagramCounterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
