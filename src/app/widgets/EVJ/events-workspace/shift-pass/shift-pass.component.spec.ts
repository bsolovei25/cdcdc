import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShiftPassComponent } from './shift-pass.component';

describe('ShiftPassComponent', () => {
    let component: ShiftPassComponent;
    let fixture: ComponentFixture<ShiftPassComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShiftPassComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ShiftPassComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
