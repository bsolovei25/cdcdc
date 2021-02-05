import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdReactorParametersComponent } from './cd-reactor-parameters.component';

describe('CdReactorParametersComponent', () => {
    let component: CdReactorParametersComponent;
    let fixture: ComponentFixture<CdReactorParametersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CdReactorParametersComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CdReactorParametersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
