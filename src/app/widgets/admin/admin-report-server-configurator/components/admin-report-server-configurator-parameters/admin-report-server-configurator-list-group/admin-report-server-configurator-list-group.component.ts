import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'evj-admin-report-server-configurator-list-group',
  templateUrl: './admin-report-server-configurator-list-group.component.html',
  styleUrls: ['./admin-report-server-configurator-list-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminReportServerConfiguratorListGroupComponent implements OnInit {

  public readonly searchIcon = 'assets/icons/widgets/admin/admin-report-server-configurator/search.svg';
  public items: Array<number> = new Array(15);

  constructor(
  ) { }

  ngOnInit(): void {}

}
