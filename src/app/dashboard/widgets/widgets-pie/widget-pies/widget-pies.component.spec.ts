import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetPiesComponent } from './widget-pies.component';

describe('WidgetPiesComponent', () => {
    let component: WidgetPiesComponent;
    let fixture: ComponentFixture<WidgetPiesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [WidgetPiesComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(WidgetPiesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
