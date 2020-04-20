import { Component, OnInit, OnDestroy, Inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';

interface ITanksTable {
    uid: string;
    name: string;
    parentUid?: string;
    parentName?: string;
    isGroup: boolean;
}

@Component({
    selector: 'evj-tanks-table',
    templateUrl: './tanks-table.component.html',
    styleUrls: ['./tanks-table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TanksTableComponent implements OnInit, OnDestroy {

    dataSource: ITanksTable[] = [];
    dataSourceTanks: ITanksTable[] = [];

    expandedElement: SelectionModel<ITanksTable[]> = new SelectionModel(true);
    selectedElement: SelectionModel<ITanksTable> = new SelectionModel();

    isRefInput: boolean = false;

    constructor(
        public dialogRef: MatDialogRef<any>,
        private chDet: ChangeDetectorRef,
        @Inject(MAT_DIALOG_DATA) public data: ITanksTable[]
    ) {
    }

    ngOnInit(): void {
        this.dataSource = [...this.data
            .filter(val => val.isGroup)];
        this.dataSourceTanks = [...this.data
            .filter(val => !val.parentUid && !val.isGroup)];
    }

    ngOnDestroy(): void {

    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    addClick(): void {
        this.dialogRef.close(this.selectedElement.selected);

    }

    getChildrenRows(element: ITanksTable): ITanksTable[] {
        return this.data.filter(val => element?.uid === val?.parentUid);
    }

    searchInput(event): void {
        this.dataSource = this.data?.filter((val) => val.name.toLowerCase()
            .includes(event?.target?.value.toLowerCase()) && val.isGroup);
        this.dataSourceTanks = this.data?.filter((val) => val.name.toLowerCase()
            .includes(event?.target?.value.toLowerCase()) && !val.parentUid && !val.isGroup);
    }

}
