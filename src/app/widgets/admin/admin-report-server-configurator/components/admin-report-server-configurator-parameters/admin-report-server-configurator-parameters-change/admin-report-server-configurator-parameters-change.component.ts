import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { IReportTemplate } from '@dashboard/models/ADMIN/report-server.model';
import { AdminReportConfiguratorService } from '@widgets/admin/admin-report-server-configurator/services/admin-report-server-configurator.service';

@Component({
  selector: 'evj-admin-report-server-configurator-parameters-change',
  templateUrl: './admin-report-server-configurator-parameters-change.component.html',
  styleUrls: ['./admin-report-server-configurator-parameters-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReportServerConfiguratorParametersChangeComponent implements OnInit {

  @Input() data: IReportTemplate = null;

  constructor(
    private arscService: AdminReportConfiguratorService
  ) {
  }

  ngOnInit(): void {
    this.arscService.reportParameters$.subscribe(value => {
      this.data = value;
      console.log(this.data);
    })
  }

}
