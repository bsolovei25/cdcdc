import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApsContextMenuComponent } from './aps-context-menu.component';

describe('ApsContextMenuComponent', () => {
    let component: ApsContextMenuComponent;
    let fixture: ComponentFixture<ApsContextMenuComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ApsContextMenuComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApsContextMenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
