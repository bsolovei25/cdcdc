import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { IHeaderSettingPanelTab } from '@dashboard/components/header-setting-panel/header-setting-panel.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

const DefaultTab = {
    name: 'Наименование хедера',
    isActivate: false,
    isOpen: false,
    filtration: '',
    relations: [],
};

@Component({
    selector: 'evj-header-setting-panel',
    templateUrl: './header-setting-panel.component.html',
    styleUrls: ['./header-setting-panel.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderSettingPanelComponent implements AfterViewInit {
    public tabsForm: FormGroup = new FormGroup({
        tabs: new FormArray([]),
    });
    public tabs$: Subject<IHeaderSettingPanelTab[]> = new Subject<IHeaderSettingPanelTab[]>();
    public searchControl: FormControl = new FormControl('');
    private tabs: IHeaderSettingPanelTab[] = [
        {
            name: 'Наименование хедера',
            isActivate: false,
            isOpen: false,
            filtration: '',
            relations: [],
        },
    ];

    constructor(public dialogRef: MatDialogRef<HeaderSettingPanelComponent>) {}

    get tabsControls(): AbstractControl[] {
        return (this.tabsForm.get('tabs') as FormArray).controls;
    }

    get tabsArray(): FormArray {
        return this.tabsForm.get('tabs') as FormArray;
    }

    public addTab(): void {
        this.tabs.push(DefaultTab);
        this.addTabGroup();
    }

    public ngAfterViewInit(): void {
        this.tabs$.next(this.tabs);
    }

    public addTabGroup(tab: IHeaderSettingPanelTab = DefaultTab): void {
        this.tabsArray.push(this.createTab());
    }

    public closeDialog(): void {
        this.dialogRef.close();
    }

    private createTab(): FormGroup {
        return new FormGroup({
            name: new FormControl('Наименование хедера'),
            isActivate: new FormControl(false),
            isOpen: new FormControl(false),
            filtration: new FormControl(''),
            relations: new FormArray([]),
        });
    }

    public removeTab(itemIndex: number): void {
        this.tabsArray.removeAt(itemIndex);
    }
}
