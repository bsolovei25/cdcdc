import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetsGridComponent } from './widgets-grid.component';

describe('NewWidgetsGridComponent', () => {
    let component: WidgetsGridComponent;
    let fixture: ComponentFixture<WidgetsGridComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WidgetsGridComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WidgetsGridComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});