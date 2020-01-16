import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleFactoryDiagramComponent } from './circle-factory-diagram.component';

describe('CircleFactoryDiagramComponent', () => {
    let component: CircleFactoryDiagramComponent;
    let fixture: ComponentFixture<CircleFactoryDiagramComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CircleFactoryDiagramComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CircleFactoryDiagramComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
