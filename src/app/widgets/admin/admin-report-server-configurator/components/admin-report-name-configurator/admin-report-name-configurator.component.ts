import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ITreeFolderMap, ICustomOptionsTemplate } from 'src/app/dashboard/models/ADMIN/report-server.model';
import { ReportsService } from 'src/app/dashboard/services/widgets/admin-panel/reports.service';
import { ReportNameConfiguratorComponent } from '../../../report-server-configurator/report-name-configurator/report-name-configurator.component';


@Component({
  selector: 'evj-admin-report-name-configurator',
  templateUrl: './admin-report-name-configurator.component.html',
  styleUrls: ['./admin-report-name-configurator.component.scss']
})
export class AdminReportNameConfiguratorComponent implements OnInit {
  text: string = ' | ';

  constructor(
      public reportService: ReportsService,
      public dialogRef: MatDialogRef<AdminReportNameConfiguratorComponent>,
      @Inject(MAT_DIALOG_DATA) public data: { item: ITreeFolderMap; res: ICustomOptionsTemplate }
  ) {}

  onNoClick(): void {
      this.dialogRef.close();
  }

  ngOnInit(): void {
      this.data.res.customOptionsFilenameSettings.push({
          name: 'Имя отчета',
          order: this.data.res.templateNameOrder,
          customOptionId: -1,
          useInFilename: this.data.res.useTemplateNameInFilename,
      });
      this.data.res.customOptionsFilenameSettings.sort((a, b) =>
          a.order > b.order ? 1 : b.order > a.order ? -1 : 0
      );
  }

  public dialogClose(): void {
      const windowsParam = {
          isShow: true,
          questionText: 'Применить внесенные изменения?',
          acceptText: 'Да',
          cancelText: 'Нет',
          acceptFunction: () => {
              const idx = this.data.res.customOptionsFilenameSettings.findIndex(
                  (value) => value.customOptionId === -1
              );
              this.data.res.templateNameOrder = this.data.res.customOptionsFilenameSettings[idx].order;
              this.data.res.useTemplateNameInFilename = this.data.res.customOptionsFilenameSettings[
                  idx
              ].useInFilename;
              this.data.res.customOptionsFilenameSettings.splice(idx, 1);
              this.dialogRef.close({ result: this.data });
          },
          closeFunction: () => {
              this.reportService.closeAlert();
          },
          cancelFunction: () => {},
      };
      this.reportService.alertWindow$.next(windowsParam);
  }

  drop(event: CdkDragDrop<unknown>): void {
      moveItemInArray(this.data.res.customOptionsFilenameSettings, event.previousIndex, event.currentIndex);
      this.data.res.customOptionsFilenameSettings.map((value, index) => {
          value.order = index;
      });
  }
}
