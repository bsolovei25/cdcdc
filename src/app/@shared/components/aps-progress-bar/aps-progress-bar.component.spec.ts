import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApsProgressBarComponent } from './aps-progress-bar.component';

describe('ApsProgressBarComponent', () => {
    let component: ApsProgressBarComponent;
    let fixture: ComponentFixture<ApsProgressBarComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ApsProgressBarComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApsProgressBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
