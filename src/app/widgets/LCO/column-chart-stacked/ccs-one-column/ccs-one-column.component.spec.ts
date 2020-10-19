import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CcsOneColumnComponent } from './ccs-one-column.component';

describe('CcsOneColumnComponent', () => {
    let component: CcsOneColumnComponent;
    let fixture: ComponentFixture<CcsOneColumnComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CcsOneColumnComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CcsOneColumnComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
