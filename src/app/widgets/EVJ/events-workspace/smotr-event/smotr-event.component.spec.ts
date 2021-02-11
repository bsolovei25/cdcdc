import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmotrEventComponent } from './smotr-event.component';

describe('SmotrEventComponent', () => {
    let component: SmotrEventComponent;
    let fixture: ComponentFixture<SmotrEventComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SmotrEventComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SmotrEventComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
