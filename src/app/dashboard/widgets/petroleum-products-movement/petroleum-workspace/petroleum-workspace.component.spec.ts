import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetroleumWorkspaceComponent } from './petroleum-workspace.component';

describe('PetroleumWorkspaceComponent', () => {
    let component: PetroleumWorkspaceComponent;
    let fixture: ComponentFixture<PetroleumWorkspaceComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PetroleumWorkspaceComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PetroleumWorkspaceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
