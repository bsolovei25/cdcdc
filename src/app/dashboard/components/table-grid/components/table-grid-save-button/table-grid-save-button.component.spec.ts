import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGridSaveButtonComponent } from './table-grid-save-button.component';

describe('TableGridSaveButtonComponent', () => {
    let component: TableGridSaveButtonComponent;
    let fixture: ComponentFixture<TableGridSaveButtonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TableGridSaveButtonComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableGridSaveButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
