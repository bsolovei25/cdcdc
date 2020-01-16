import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RingFactoryDiagramComponent } from './ring-factory-diagram.component';

describe('RingFactoryDiagramComponent', () => {
    let component: RingFactoryDiagramComponent;
    let fixture: ComponentFixture<RingFactoryDiagramComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RingFactoryDiagramComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RingFactoryDiagramComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
