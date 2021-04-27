import { Component, OnInit, ChangeDetectionStrategy, Input, OnDestroy } from "@angular/core";
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { IReportTemplate, ISystemOptions } from '../../models/admin-report-server-configurator.model';
import { AdminReportServerConfiguratorRootService } from '../../services/admin-report-server-configurator-root.service';
import { AdminReportConfiguratorService } from '../../services/admin-report-server-configurator.service';
import { AdminReportServerConfiguratorParametersSelectComponent } from './admin-report-server-configurator-parameters-select/admin-report-server-configurator-parameters-select.component';

@Component({
  selector: 'evj-admin-report-server-configurator-parameters',
  templateUrl: './admin-report-server-configurator-parameters.component.html',
  styleUrls: ['./admin-report-server-configurator-parameters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReportServerConfiguratorParametersComponent implements OnInit, OnDestroy {

  @Input() data: IReportTemplate = null;
  public form: FormGroup;
  public parameter: number = 1;
  public parameters: number = 1;
  public options: ISystemOptions[] = [];

  constructor(
    public dialog: MatDialog,
    private arscService: AdminReportConfiguratorService,
    private arscRootService: AdminReportServerConfiguratorRootService
  ) { }

  ngOnInit(): void {
    this.arscService.headerSettingsPicker.subscribe(value => {
      this.parameter = value;
    });
    this.arscService.reportParameters$.subscribe(value => {
      this.data = value;
      console.log(this.data);
    });
    this.arscService.headerSettingsPicker.subscribe(value => {
      this.parameters = value;
    });
    this.systemOptions();

    this.form = new FormGroup({});
  }

  ngOnDestroy(): void {
    this.arscService.headerSettingsPicker.unsubscribe();
  }

  public openSelect(): void {
    const dialogRef = this.dialog.open(AdminReportServerConfiguratorParametersSelectComponent,
      {data: {data: this.data, options: this.options}});

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
    debugger;
    this.options = data;
    console.log(this.options);
  }

  public submit(): void {
    console.log(this.form);
  }

}
