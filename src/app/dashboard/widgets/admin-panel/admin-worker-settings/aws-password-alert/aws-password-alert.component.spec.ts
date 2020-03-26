import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsPasswordAlertComponent } from './aws-password-alert.component';

describe('AwsPasswordAlertComponent', () => {
    let component: AwsPasswordAlertComponent;
    let fixture: ComponentFixture<AwsPasswordAlertComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AwsPasswordAlertComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AwsPasswordAlertComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
