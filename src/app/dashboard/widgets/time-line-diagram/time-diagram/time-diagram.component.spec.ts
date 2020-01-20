import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeDiagramComponent } from './time-diagram.component';

describe('TimeDiagramComponent', () => {
    let component: TimeDiagramComponent;
    let fixture: ComponentFixture<TimeDiagramComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TimeDiagramComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TimeDiagramComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
