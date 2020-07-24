import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplineDiagramComponent } from './spline-diagram.component';

describe('SplineDiagramComponent', () => {
    let component: SplineDiagramComponent;
    let fixture: ComponentFixture<SplineDiagramComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SplineDiagramComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SplineDiagramComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
