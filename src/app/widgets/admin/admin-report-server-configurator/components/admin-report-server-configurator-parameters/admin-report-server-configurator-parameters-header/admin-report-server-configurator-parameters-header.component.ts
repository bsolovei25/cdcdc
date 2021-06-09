import { Component, OnInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ISystemOptions } from '@widgets/admin/admin-report-server-configurator/models/admin-report-server-configurator.model';
import { AdminReportServerConfiguratorRootService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator-root.service';
import { AdminReportConfiguratorService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator.service';
import { AdminReportServerConfiguratorParametersSelectComponent } from '../admin-report-server-configurator-parameters-select/admin-report-server-configurator-parameters-select.component';

@Component({
  selector: 'evj-admin-report-server-configurator-parameters-header',
  templateUrl: './admin-report-server-configurator-parameters-header.component.html',
  styleUrls: ['./admin-report-server-configurator-parameters-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReportServerConfiguratorParametersHeaderComponent implements OnInit, OnDestroy {

  public parameters: number = 1;
  public options: ISystemOptions[] = [];
  public disable: boolean = false;

  constructor(
    public dialog: MatDialog,
    private arscService: AdminReportConfiguratorService,
    private arscRootService: AdminReportServerConfiguratorRootService
    ) {}

  ngOnInit(): void {
    this.arscService.headerSettingsPicker.subscribe(value => {
      this.parameters = value;
      value === 0 ? this.disable = true : this.disable = false;
    });
    this.systemOptions();
  }

  ngOnDestroy(): void {
    this.arscService.headerSettingsPicker.unsubscribe();
  }

  public openSelect(): void {
    const dialogRef = this.dialog.open(AdminReportServerConfiguratorParametersSelectComponent, {data: this.options});

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  public openParameters(): void {
    this.arscService.headerSettingsPicker.next(1);
  }

  public openAccessLevel(): void {
    this.arscService.headerSettingsPicker.next(2);
  }
  public async systemOptions(): Promise<void> {
    const data = await this.arscRootService.getSystemOptions();
    this.options = data;
  }
}
