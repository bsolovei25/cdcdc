import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EvjSmpoEventComponent } from './evj-smpo-event.component';

describe('EvjSmpoEventComponent', () => {
    let component: EvjSmpoEventComponent;
    let fixture: ComponentFixture<EvjSmpoEventComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [EvjSmpoEventComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(EvjSmpoEventComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
