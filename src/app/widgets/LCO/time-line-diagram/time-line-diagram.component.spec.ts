import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLineDiagramComponent } from './time-line-diagram.component';

describe('TimeLineDiagramComponent', () => {
    let component: TimeLineDiagramComponent;
    let fixture: ComponentFixture<TimeLineDiagramComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TimeLineDiagramComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeLineDiagramComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
