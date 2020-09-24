import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RingFactoryDiagramsComponent } from './ring-factory-diagrams.component';

describe('RingSFactoryDiagramComponent', () => {
    let component: RingFactoryDiagramsComponent;
    let fixture: ComponentFixture<RingFactoryDiagramsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RingFactoryDiagramsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RingFactoryDiagramsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
