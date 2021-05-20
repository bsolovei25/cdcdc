import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ICustomOptions, IPostSystemOptionsTemplate, IReportFile, IReportTemplate, ISystemOptions, ISystemOptionsTemplate } from '../../models/admin-report-server-configurator.model';
import { AdminReportServerConfiguratorRootService } from '../../services/admin-report-server-configurator-root.service';
import { AdminReportConfiguratorService } from '../../services/admin-report-server-configurator.service';
import { AdminRscPathEditComponent } from './admin-rsc-path-edit/admin-rsc-path-edit.component';
import { AdminReportServerConfiguratorParametersSelectComponent } from './admin-report-server-configurator-parameters-select/admin-report-server-configurator-parameters-select.component';
import { AdminRscAutogenerationComponent } from './admin-rsc-autogeneration/admin-rsc-autogeneration.component';
import { AdminRscMacrosEditComponent } from './admin-rsc-macros-edit/admin-rsc-macros-edit.component';
import { AdminRscParameterAutogenerationComponent } from './admin-rsc-parameter-autogeneration/admin-rsc-parameter-autogeneration.component';
import { AdminRscPeriodEditComponent } from './admin-rsc-period-edit/admin-rsc-period-edit.component';
import { AdminRscReportSheetComponent } from './admin-rsc-report-sheet/admin-rsc-report-sheet.component';
import { AdminRscCustomOptionsComponent } from './admin-rsc-custom-options/admin-rsc-custom-options.component';

@Component({
  selector: 'evj-admin-report-server-configurator-parameters',
  templateUrl: './admin-report-server-configurator-parameters.component.html',
  styleUrls: ['./admin-report-server-configurator-parameters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReportServerConfiguratorParametersComponent implements OnInit {

  public reportIcon: string = "assets/icons/widgets/admin/admin-report-server-configurator/report-list.svg"
  public data: IReportTemplate = null;
  public parameter: number = 1;
  public options: ISystemOptions[] = [];
  public reportFileTemplate: IReportFile[] = [];
  public currentRepFileTemplate: IReportFile = null;
  public userOptions: ICustomOptions[] = [];
  public form: FormGroup = null;
  public file: any;

  constructor(
    public dialog: MatDialog,
    public arscService: AdminReportConfiguratorService,
    private arscRootService: AdminReportServerConfiguratorRootService
  ) { }

  ngOnInit(): void {
    this.systemOptions();
    this.getReportFileTemplate();
    this.getCustomOptions();

    this.form = new FormGroup({
      reportFileTemplate: new FormControl(null)
    });

    this.arscService.reportParameters$.subscribe(value => {
      this.data = value;
      console.log(this.data);
      this.form.controls['reportFileTemplate'].setValue(this.data?.fileTemplate);      
    });
    this.arscService.headerSettingsPicker.subscribe(value => {
      this.parameter = value;
    });
  }

  ngOnDestroy(): void {
    this.arscService.headerSettingsPicker.unsubscribe();
  }

  public openSelect(): void {
    const dialogRef = this.dialog.open(AdminReportServerConfiguratorParametersSelectComponent,
      { data: { data: this.data, options: this.options } });

    dialogRef.afterClosed().subscribe(result => {
      this.data = result;
    });
  }
  public async systemOptions(): Promise<void> {
    const data = await this.arscRootService.getSystemOptions();
    this.options = data;
    console.log(data);
  }
  public async getReportFileTemplate(): Promise<void> {
    const data = await this.arscRootService.getReportFileTemplate();
    this.reportFileTemplate = data;
  }

  public async getCustomOptions(): Promise<void> {
    const data = await this.arscRootService.getUserOptions();
    this.userOptions = data;
  }

  public compareFn(a, b): boolean {
    return a.id === b.id;
  }

  public openOption(el: ISystemOptions) {
    console.log(el);
    switch (el.systemOptionType) {
      case 'macroEdit': {
        const dialofRef = this.dialog.open(AdminRscMacrosEditComponent, { data: this.data});
        dialofRef.afterClosed().subscribe(result => {
          this.data = result
        })
        break;
      }
      case 'autogenerate': {
        const dialofRef = this.dialog.open(AdminRscAutogenerationComponent, { data: this.data});
        dialofRef.afterClosed().subscribe(result => {
          this.data = result
        })
        break;
      }
      case 'reportSheets': {
        const dialofRef = this.dialog.open(AdminRscReportSheetComponent, { data: this.data});
        dialofRef.afterClosed().subscribe(result => {
          this.data = result
        })
        break;
      }
      case 'periodEdit': {
        const dialofRef = this.dialog.open(AdminRscPeriodEditComponent, { data: this.data});
        dialofRef.afterClosed().subscribe(result => {
          this.data = result
        })
        break;
      }
      case 'parameterValuesAutogeneration': {
        const dialofRef = this.dialog.open(AdminRscParameterAutogenerationComponent, { data: this.data});
        dialofRef.afterClosed().subscribe(result => {
          this.data = result
        })
        break;
      }
      case 'pathEdit': {
        const dialofRef = this.dialog.open(AdminRscPathEditComponent, { data: this.data});
        dialofRef.afterClosed().subscribe(result => {
          this.data = result
        })
        break;
      }
      case 'customOptions': {
        const dialofRef = this.dialog.open(AdminRscCustomOptionsComponent, { data: {data: this.data, userOptions: this.userOptions}});
        dialofRef.afterClosed().subscribe(result => {
          this.data = result
        })
        break;
      }
    }
  }

  public save(): void {
    const options: ISystemOptionsTemplate[] = [];
    let postOptions = null;

    this.data.systemOptions.forEach((v) => {      
      postOptions = {
        templateSystemOption: { id: v.templateSystemOption.id },
        value: v.value,
      }
      options.push(postOptions);
    });

    const postSystemOptionsTemplate: IPostSystemOptionsTemplate = {
      systemOptionValues: options,
      fileTemplate: this.form.get('reportFileTemplate').value,
      periodType: this.data.periodType,
    };
    this.arscRootService.postSystemOptions(this.data.id, postSystemOptionsTemplate);
    this.arscService.reportParameters$.next(this.data);
  }
}
