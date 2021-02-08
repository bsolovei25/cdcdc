import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsualEventComponent } from './usual-event.component';

describe('UsualEventComponent', () => {
    let component: UsualEventComponent;
    let fixture: ComponentFixture<UsualEventComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UsualEventComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UsualEventComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
