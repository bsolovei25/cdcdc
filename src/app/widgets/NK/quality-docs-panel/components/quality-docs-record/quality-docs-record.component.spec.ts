import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityDocsRecordComponent } from './quality-docs-record.component';

describe('QualityDocsRecordComponent', () => {
    let component: QualityDocsRecordComponent;
    let fixture: ComponentFixture<QualityDocsRecordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [QualityDocsRecordComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QualityDocsRecordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
