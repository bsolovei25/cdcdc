import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSystemOptionsComponent } from './popup-system-options.component';

describe('PopupSystemOptionsComponent', () => {
    let component: PopupSystemOptionsComponent;
    let fixture: ComponentFixture<PopupSystemOptionsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PopupSystemOptionsComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PopupSystemOptionsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
