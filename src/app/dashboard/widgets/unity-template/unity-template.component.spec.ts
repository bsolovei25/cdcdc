import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnityTemplateComponent } from './unity-template.component';

describe('UnityTemplateComponent', () => {
    let component: UnityTemplateComponent;
    let fixture: ComponentFixture<UnityTemplateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UnityTemplateComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UnityTemplateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
