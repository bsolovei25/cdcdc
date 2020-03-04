import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetroleumUnityComponent } from './petroleum-unity.component';

describe('PetroleumUnityComponent', () => {
    let component: PetroleumUnityComponent;
    let fixture: ComponentFixture<PetroleumUnityComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetroleumUnityComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetroleumUnityComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
