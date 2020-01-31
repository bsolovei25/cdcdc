import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DppColumnUpperComponent } from './dpp-column-upper.component';

describe('DppColumnUpperComponent', () => {
    let component: DppColumnUpperComponent;
    let fixture: ComponentFixture<DppColumnUpperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DppColumnUpperComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DppColumnUpperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
