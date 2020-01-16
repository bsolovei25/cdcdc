import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviationCircleDiagramComponent } from './deviation-circle-diagram.component';

describe('DeviationCircleDiagramComponent', () => {
    let component: DeviationCircleDiagramComponent;
    let fixture: ComponentFixture<DeviationCircleDiagramComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DeviationCircleDiagramComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DeviationCircleDiagramComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
