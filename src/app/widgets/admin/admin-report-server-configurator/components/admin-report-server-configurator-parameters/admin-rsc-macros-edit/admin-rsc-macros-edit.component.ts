import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IReportTemplate } from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';

@Component({
  selector: 'evj-admin-rsc-macros-edit',
  templateUrl: './admin-rsc-macros-edit.component.html',
  styleUrls: ['./admin-rsc-macros-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminRscMacrosEditComponent implements OnInit {

  public macros = [
    { name: 'test1' },
    { name: 'test2' },
    { name: 'test3' },
    { name: 'test4' },
    { name: 'test5' },
    { name: 'test6' },
    { name: 'test7' },
    { name: 'test8' },
    { name: 'test9' },
    { name: 'test10' },
];

  constructor(
    public dialogRef: MatDialogRef<AdminRscMacrosEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IReportTemplate,
  ) { }

  ngOnInit(): void {
  }

  public drop(event: CdkDragDrop<{name: string}[]>): void {
    moveItemInArray(this.macros, event.previousIndex, event.currentIndex);
}
  
  public onSave(): void {
    this.dialogRef.close(this.data);
  }
}
