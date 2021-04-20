import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AdminReportConfiguratorService } from '../../services/admin-report-server-configurator.service';

@Component({
  selector: 'evj-admin-report-server-configurator-parameters',
  templateUrl: './admin-report-server-configurator-parameters.component.html',
  styleUrls: ['./admin-report-server-configurator-parameters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReportServerConfiguratorParametersComponent implements OnInit {

  public parameter: number = 1;

  constructor(
    private arscService: AdminReportConfiguratorService,
  ) { }

  ngOnInit(): void {
    this.arscService.headerSettingsPicker.subscribe(value => {
      this.parameter = value;
    })
  }

  ngOnDestroy(): void {
    this.arscService.headerSettingsPicker.unsubscribe();
  }

}
