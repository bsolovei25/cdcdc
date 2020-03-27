import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwsWorkspacesComponent } from './aws-workspaces.component';

describe('AwsWorkspacesComponent', () => {
    let component: AwsWorkspacesComponent;
    let fixture: ComponentFixture<AwsWorkspacesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AwsWorkspacesComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AwsWorkspacesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
