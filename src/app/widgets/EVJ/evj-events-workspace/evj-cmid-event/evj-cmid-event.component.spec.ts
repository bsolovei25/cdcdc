import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjCmidEventComponent } from './evj-cmid-event.component';

describe('EvjCmidEventComponent', () => {
    let component: EvjCmidEventComponent;
    let fixture: ComponentFixture<EvjCmidEventComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EvjCmidEventComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EvjCmidEventComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
