import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugeDiagramComponent } from './gauge-diagram.component';

describe('GaugeDiagramComponent', () => {
    let component: GaugeDiagramComponent;
    let fixture: ComponentFixture<GaugeDiagramComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GaugeDiagramComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GaugeDiagramComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
