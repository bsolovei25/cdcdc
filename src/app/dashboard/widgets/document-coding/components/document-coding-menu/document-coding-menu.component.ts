import { Component, OnInit } from '@angular/core';
import { DocumentCodingService } from 'src/app/dashboard/services/oil-control-services/document-coding.service';
import { SnackBarService } from 'src/app/dashboard/services/snack-bar.service';

@Component({
  selector: 'evj-document-coding-menu',
  templateUrl: './document-coding-menu.component.html',
  styleUrls: ['./document-coding-menu.component.scss']
})
export class DocumentCodingMenuComponent implements OnInit {

  public dateNow: Date = new Date();

  constructor(
    public oilService: DocumentCodingService,
    public snackBar: SnackBarService,
  ) { }

  ngOnInit(): void {
  }

  saveFile(): void {
    const windowsParam = {
      isShow: true,
      questionText: 'Вы уверены, что хотите сохранить файл?',
      acceptText: 'Да',
      cancelText: 'Нет',
      acceptFunction: () => this.snackBar.openSnackBar(
        'Файл сохранен',
      ),
      closeFunction: () => this.oilService.closeAlert(),
      cancelFunction: () => {},
    };
    this.oilService.alertWindow$.next(windowsParam);
  }

}
