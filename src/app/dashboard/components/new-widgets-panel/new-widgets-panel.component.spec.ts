import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewWidgetsPanelComponent } from './new-widgets-panel.component';

describe('NewWidgetsPanelComponent', () => {
    let component: NewWidgetsPanelComponent;
    let fixture: ComponentFixture<NewWidgetsPanelComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewWidgetsPanelComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewWidgetsPanelComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
