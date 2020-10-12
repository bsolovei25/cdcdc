import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedLineDiagramComponent } from './detailed-line-diagram.component';

describe('DetailedLineDiagramComponent', () => {
    let component: DetailedLineDiagramComponent;
    let fixture: ComponentFixture<DetailedLineDiagramComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DetailedLineDiagramComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DetailedLineDiagramComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
