import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NecessaryParamComponent } from './necessary-param.component';

describe('NecessaryParamComponent', () => {
    let component: NecessaryParamComponent;
    let fixture: ComponentFixture<NecessaryParamComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NecessaryParamComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NecessaryParamComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
