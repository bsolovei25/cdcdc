import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBrigadesComponent } from './admin-brigades.component';

describe('AdminBrigadesComponent', () => {
    let component: AdminBrigadesComponent;
    let fixture: ComponentFixture<AdminBrigadesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AdminBrigadesComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AdminBrigadesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
