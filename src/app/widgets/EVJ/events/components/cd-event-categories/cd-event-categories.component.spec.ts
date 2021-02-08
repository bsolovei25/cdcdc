import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CdEventCategoriesComponent } from './cd-event-categories.component';

describe('CdEventCategoriesComponent', () => {
    let component: CdEventCategoriesComponent;
    let fixture: ComponentFixture<CdEventCategoriesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CdEventCategoriesComponent],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CdEventCategoriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
