import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftPersonComponent } from './shift-person.component';

describe('ShiftPersonComponent', () => {
    let component: ShiftPersonComponent;
    let fixture: ComponentFixture<ShiftPersonComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShiftPersonComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShiftPersonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
