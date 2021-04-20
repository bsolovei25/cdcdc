import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISystemOptions } from '@dashboard/models/ADMIN/report-server.model';
import { AdminReportServerConfiguratorRootService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator-root.service';

@Component({
  selector: 'evj-admin-report-server-configurator-parameters-select',
  templateUrl: './admin-report-server-configurator-parameters-select.component.html',
  styleUrls: ['./admin-report-server-configurator-parameters-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReportServerConfiguratorParametersSelectComponent implements OnInit {

  public readonly closePopupIcon='assets/icons/widgets/admin/admin-report-server-configurator/close-popup.svg';
  public readonly listIcon='assets/icons/widgets/admin/admin-report-server-configurator/list.svg';

  public options: ISystemOptions[] = [];

  ngOnInit(): void {
    this.systemOptions();
  }
  constructor(
    public dialogRef: MatDialogRef<AdminReportServerConfiguratorParametersSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ISystemOptions,
    private arscService: AdminReportServerConfiguratorRootService
    ){}

  onClose(): void {
    this.dialogRef.close();
  }

  public async systemOptions(): Promise<void> {
    const data = await this.arscService.getSystemOptions();
    this.options = data;
    console.log(this.options);
  }
  
}
