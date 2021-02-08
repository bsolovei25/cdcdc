import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertPasswordComponent } from './alert-password.component';

describe('AlertPasswordComponent', () => {
    let component: AlertPasswordComponent;
    let fixture: ComponentFixture<AlertPasswordComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AlertPasswordComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertPasswordComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
