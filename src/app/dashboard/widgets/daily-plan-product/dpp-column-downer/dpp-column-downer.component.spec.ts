import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DppColumnDownerComponent } from './dpp-column-downer.component';

describe('DppColumnDownerComponent', () => {
    let component: DppColumnDownerComponent;
    let fixture: ComponentFixture<DppColumnDownerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DppColumnDownerComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DppColumnDownerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
