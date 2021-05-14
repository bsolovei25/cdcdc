import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit } from '@angular/core';
import { IFolder, IReportTemplate, ITemplateFolder, ITemplate } from '../../models/admin-report-server-configurator.model';
import { AdminReportServerConfiguratorRootService } from '../../services/admin-report-server-configurator-root.service';
import { AdminReportConfiguratorService } from '../../services/admin-report-server-configurator.service';

@Component({
  selector: 'evj-admin-server-configurator-reference-menu',
  templateUrl: './admin-server-configurator-reference-menu.component.html',
  styleUrls: ['./admin-server-configurator-reference-menu.component.scss']
})
export class AdminServerConfiguratorReferenceMenuComponent implements OnInit {
  @Input() public childrens: ITemplateFolder[];
  @Input() public templates: ITemplate[];

  public search: string = '';

  constructor(
    public arscService: AdminReportConfiguratorService,
  ) { }

  ngOnInit(): void {
    this.arscService.folders$.subscribe(value => {
      this.childrens = value;
    });
    this.arscService.reports$.subscribe(value => {
      this.templates = value;
    })
    this.arscService.search$.subscribe(value => {
      this.search = value;
    })
  }

  public drop(event: CdkDragDrop<ITemplateFolder[]>) {
      transferArrayItem(
        this.arscService.data?.folders,
        this.arscService.data?.folders[event.currentIndex].childFolders,
        event.previousIndex,
        event.currentIndex
      );
  }
}
