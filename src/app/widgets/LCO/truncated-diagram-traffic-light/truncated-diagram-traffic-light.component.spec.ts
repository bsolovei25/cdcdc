import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruncatedDiagramTrafficLightComponent } from './truncated-diagram-traffic-light.component';

describe('TruncatedDiagramTrafficLightComponent', () => {
    let component: TruncatedDiagramTrafficLightComponent;
    let fixture: ComponentFixture<TruncatedDiagramTrafficLightComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TruncatedDiagramTrafficLightComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TruncatedDiagramTrafficLightComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
