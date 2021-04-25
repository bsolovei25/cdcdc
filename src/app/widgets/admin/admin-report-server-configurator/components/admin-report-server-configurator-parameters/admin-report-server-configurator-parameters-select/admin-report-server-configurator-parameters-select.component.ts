import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ChangeDetectionStrategy, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ISystemOptions, ISystemOptionsTemplate } from '@dashboard/models/ADMIN/report-server.model';
import { IReportTemplate } from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';
import { AdminReportServerConfiguratorRootService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator-root.service';
import { AdminReportConfiguratorService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator.service';

@Component({
  selector: 'evj-admin-report-server-configurator-parameters-select',
  templateUrl: './admin-report-server-configurator-parameters-select.component.html',
  styleUrls: ['./admin-report-server-configurator-parameters-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReportServerConfiguratorParametersSelectComponent implements OnInit {

  public readonly closePopupIcon='assets/icons/widgets/admin/admin-report-server-configurator/close-popup.svg';
  public readonly listIcon='assets/icons/widgets/admin/admin-report-server-configurator/list.svg';
  public selectParameter: SelectionModel<ISystemOptions> = new SelectionModel<ISystemOptions>(true);
  public selectedParameters: ISystemOptions[] = [];
  @Input() public report: IReportTemplate = null;

  ngOnInit(): void {
    console.log(this.data.options);
    console.log(this.data.data);
    
  }
  constructor(
    public dialogRef: MatDialogRef<AdminReportServerConfiguratorParametersSelectComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {data: IReportTemplate, options: ISystemOptions[]},
    private arscRootService: AdminReportServerConfiguratorRootService,
    private arscService: AdminReportConfiguratorService
    ){}

  onClose(): void {
    this.dialogRef.close();
  }

  public chooseParameter(parameter: ISystemOptions, item: ISystemOptions): void {
    console.log(item);

    item.isActive = !item.isActive;

  if (item.isActive) {
      this.selectedParameters.push(item);
  } else {
      const index = this.selectedParameters.findIndex((e) => e.isActive);
      this.selectedParameters.splice(index, 1);
  }
  }
  
}
