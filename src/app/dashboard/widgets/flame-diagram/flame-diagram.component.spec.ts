import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlameDiagramComponent } from './flame-diagram.component';

describe('FlameDiagramComponent', () => {
    let component: FlameDiagramComponent;
    let fixture: ComponentFixture<FlameDiagramComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FlameDiagramComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(FlameDiagramComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
