import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleBlockDiagramComponent } from './circle-block-diagram.component';

describe('CircleBlockDiagramComponent', () => {
    let component: CircleBlockDiagramComponent;
    let fixture: ComponentFixture<CircleBlockDiagramComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CircleBlockDiagramComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CircleBlockDiagramComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
