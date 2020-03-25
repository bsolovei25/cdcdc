import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsCheckboxCardComponent } from './aws-checkbox-card.component';

describe('AwsCheckboxCardComponent', () => {
    let component: AwsCheckboxCardComponent;
    let fixture: ComponentFixture<AwsCheckboxCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AwsCheckboxCardComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AwsCheckboxCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
