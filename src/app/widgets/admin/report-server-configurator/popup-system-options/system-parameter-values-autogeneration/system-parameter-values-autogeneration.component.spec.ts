import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemParameterValuesAutogenerationComponent } from './system-parameter-values-autogeneration.component';

describe('SystemParameterValuesAutogenerationComponent', () => {
    let component: SystemParameterValuesAutogenerationComponent;
    let fixture: ComponentFixture<SystemParameterValuesAutogenerationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SystemParameterValuesAutogenerationComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SystemParameterValuesAutogenerationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
