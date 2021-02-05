import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterAutogenerationComponent } from './parameter-autogeneration.component';

describe('ParameterAutogenerationComponent', () => {
    let component: ParameterAutogenerationComponent;
    let fixture: ComponentFixture<ParameterAutogenerationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ParameterAutogenerationComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ParameterAutogenerationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
