import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'evj-admin-report-server-configurator-access',
  templateUrl: './admin-report-server-configurator-access.component.html',
  styleUrls: ['./admin-report-server-configurator-access.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReportServerConfiguratorAccessComponent implements OnInit {

  public readonly searchIcon = 'assets/icons/widgets/admin/admin-report-server-configurator/search.svg';
  public items: Array<number> = new Array(15);

  constructor(
  ) { }

  ngOnInit(): void {}

}
