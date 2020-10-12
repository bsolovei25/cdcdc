import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LineDatetimeComponent } from './line-datetime.component';

describe('LineDatetimeComponent', () => {
    let component: LineDatetimeComponent;
    let fixture: ComponentFixture<LineDatetimeComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LineDatetimeComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LineDatetimeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
