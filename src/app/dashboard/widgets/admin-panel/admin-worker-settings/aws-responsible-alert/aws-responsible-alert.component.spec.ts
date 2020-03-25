import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsResponsibleAlertComponent } from './aws-responsible-alert.component';

describe('AwsAlertComponent', () => {
    let component: AwsResponsibleAlertComponent;
    let fixture: ComponentFixture<AwsResponsibleAlertComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AwsResponsibleAlertComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AwsResponsibleAlertComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
