import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityDocsPanelComponent } from './quality-docs-panel.component';

describe('QualityDocsPanelComponent', () => {
    let component: QualityDocsPanelComponent;
    let fixture: ComponentFixture<QualityDocsPanelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QualityDocsPanelComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QualityDocsPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
