import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApsRecipeDiagramQualityComponent } from './aps-recipe-diagram-quality.component';

describe('ApsRecipeDiagramQuilityComponent', () => {
    let component: ApsRecipeDiagramQualityComponent;
    let fixture: ComponentFixture<ApsRecipeDiagramQualityComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ApsRecipeDiagramQualityComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApsRecipeDiagramQualityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
