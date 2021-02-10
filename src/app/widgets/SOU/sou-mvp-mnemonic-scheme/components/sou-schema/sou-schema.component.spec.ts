import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouSchemaComponent } from './sou-schema.component';

describe('SouSchemaComponent', () => {
    let component: SouSchemaComponent;
    let fixture: ComponentFixture<SouSchemaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SouSchemaComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SouSchemaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
