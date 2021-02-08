import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdImportComponent } from './admin-ad-import.component';

describe('AdminAdImportComponent', () => {
    let component: AdminAdImportComponent;
    let fixture: ComponentFixture<AdminAdImportComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdminAdImportComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminAdImportComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
