import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'evj-admin-report-server-configurator-parameters-select',
  templateUrl: './admin-report-server-configurator-parameters-select.component.html',
  styleUrls: ['./admin-report-server-configurator-parameters-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReportServerConfiguratorParametersSelectComponent implements OnInit {

  public readonly closePopupIcon='assets/icons/widgets/admin/admin-report-server-configurator/close-popup.svg';
  public readonly listIcon='assets/icons/widgets/admin/admin-report-server-configurator/list.svg';

  ngOnInit(): void {
  }
  constructor(
    public dialogRef: MatDialogRef<AdminReportServerConfiguratorParametersSelectComponent>,){}

  onClose(): void {
    this.dialogRef.close();
  }
}
