import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableGridInputComponent } from './table-grid-input.component';

describe('TableGridInputComponent', () => {
    let component: TableGridInputComponent;
    let fixture: ComponentFixture<TableGridInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TableGridInputComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TableGridInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
