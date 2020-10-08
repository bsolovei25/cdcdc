import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointDiagramComponent } from './point-diagram.component';

describe('PointDiagramComponent', () => {
    let component: PointDiagramComponent;
    let fixture: ComponentFixture<PointDiagramComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PointDiagramComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PointDiagramComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
