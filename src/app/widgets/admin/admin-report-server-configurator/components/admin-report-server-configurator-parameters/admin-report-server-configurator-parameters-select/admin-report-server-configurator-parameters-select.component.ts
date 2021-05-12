import { Component, OnInit, ChangeDetectionStrategy, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISystemOptions, ISystemOptionsTemplate } from '@dashboard/models/ADMIN/report-server.model';
import { IReportTemplate } from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';
import { AdminReportConfiguratorService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator.service';

@Component({
  selector: 'evj-admin-report-server-configurator-parameters-select',
  templateUrl: './admin-report-server-configurator-parameters-select.component.html',
  styleUrls: ['./admin-report-server-configurator-parameters-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReportServerConfiguratorParametersSelectComponent implements OnInit {

  public readonly closePopupIcon = 'assets/icons/widgets/admin/admin-report-server-configurator/close-popup.svg';
  public readonly listIcon = 'assets/icons/widgets/admin/admin-report-server-configurator/list.svg';
  @Input() public report: IReportTemplate = null;

  ngOnInit(): void {
    this.data.options.forEach(v => v.isActive = false)
    this.data.data?.systemOptions?.forEach((v) => {
      this.data.options.forEach(s => {
        if (s.id === v.templateSystemOptionId) {
          s.isActive = true;
        }
      });
    });
  }

  constructor(
    public dialogRef: MatDialogRef<AdminReportServerConfiguratorParametersSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { data: IReportTemplate, options?: ISystemOptions[] },
    private arscService: AdminReportConfiguratorService
  ) { }

  onClose(): void {
    this.dialogRef.close();
  }

  public chooseParameter(item: ISystemOptions): void {
    console.log(item);

    item.isActive = !item.isActive;
    const systemOptionsTemplate: ISystemOptionsTemplate = {
      templateSystemOption: item,
      value: item.defaultValue
    }

    if (item.isActive) {
      this.data.data.systemOptions.push(systemOptionsTemplate);
    }
    if (!item.isActive) {
      const index = this.data.data.systemOptions.findIndex((e) => e);
      this.data.data.systemOptions.splice(index, 1);
    }
  }

  public onSave(): void {
    this.arscService.headerSettingsPicker.next(1);
    this.dialogRef.close(this.data.data);
  }
}
