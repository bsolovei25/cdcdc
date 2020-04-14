import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
    selector: 'evj-tanks-table',
    templateUrl: './tanks-table.component.html',
    styleUrls: ['./tanks-table.component.scss'],
})
export class TanksTableComponent implements OnInit, OnDestroy {

    date: Date = new Date();

    dataSource: any[] = [];

    expandedElement: SelectionModel<any> = new SelectionModel(true);

    constructor(
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any[]
    ) {
    }

    ngOnInit(): void {
        this.dataSource = [...this.data.filter(val => val?.parentUid === undefined)];

    }

    ngOnDestroy(): void {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    getChildrenRows(element: any): any {
        // console.log(this.dataSource.filter(val => val.parentUid));
        console.log(this.expandedElement.selected);

        return this.dataSource.filter(val => element?.uid === val?.parentUid);
    }

}
