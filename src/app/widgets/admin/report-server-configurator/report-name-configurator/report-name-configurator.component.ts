import { Component, Inject, OnInit } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

@Component({
    selector: "evj-report-name-configurator",
    templateUrl: "./report-name-configurator.component.html",
    styleUrls: ["./report-name-configurator.component.scss"]
})
export class ReportNameConfiguratorComponent implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ReportNameConfiguratorComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { }) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    ngOnInit(): void {
    }

}
