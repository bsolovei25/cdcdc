import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RectangleInputComponent } from './rectangle-input.component';

describe('RectangleInputComponent', () => {
    let component: RectangleInputComponent;
    let fixture: ComponentFixture<RectangleInputComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RectangleInputComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RectangleInputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
