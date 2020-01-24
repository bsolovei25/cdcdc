import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReferencesComponent } from './admin-references.component';

describe('AdminReferencesComponent', () => {
    let component: AdminReferencesComponent;
    let fixture: ComponentFixture<AdminReferencesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdminReferencesComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminReferencesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
