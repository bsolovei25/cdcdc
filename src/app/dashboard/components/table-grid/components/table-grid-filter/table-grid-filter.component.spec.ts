import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGridFilterComponent } from './table-grid-filter.component';

describe('TableGridFilterComponent', () => {
    let component: TableGridFilterComponent;
    let fixture: ComponentFixture<TableGridFilterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TableGridFilterComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableGridFilterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
