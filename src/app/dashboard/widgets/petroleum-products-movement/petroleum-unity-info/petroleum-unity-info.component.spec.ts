import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetroleumUnityInfoComponent } from './petroleum-unity-info.component';

describe('PetroleumUnityInfoComponent', () => {
    let component: PetroleumUnityInfoComponent;
    let fixture: ComponentFixture<PetroleumUnityInfoComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetroleumUnityInfoComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetroleumUnityInfoComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
