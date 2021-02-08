import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmpEventsWorkspaceComponent } from './smp-events-workspace.component';

describe('SmpEventsWorkspaceComponent', () => {
    let component: SmpEventsWorkspaceComponent;
    let fixture: ComponentFixture<SmpEventsWorkspaceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SmpEventsWorkspaceComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SmpEventsWorkspaceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
