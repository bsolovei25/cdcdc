import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjMainToggleComponent } from './evj-main-toggle.component';

describe('EvjMainToggleComponent', () => {
    let component: EvjMainToggleComponent;
    let fixture: ComponentFixture<EvjMainToggleComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EvjMainToggleComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EvjMainToggleComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
