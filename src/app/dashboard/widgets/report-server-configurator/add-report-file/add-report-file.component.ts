import { Component, OnInit, Renderer2, ElementRef, ViewChild, HostListener, Output, EventEmitter } from '@angular/core';
import { IFileTemplate, IReportTemplate } from 'src/app/dashboard/models/report-server';
import { SnackBarService } from 'src/app/dashboard/services/snack-bar.service';
import { ReportServerConfiguratorService } from '../../../services/widgets/report-server-configurator.service';

@Component({
  selector: 'evj-add-report-file',
  templateUrl: './add-report-file.component.html',
  styleUrls: ['./add-report-file.component.scss']
})
export class AddReportFileComponent implements OnInit {
  @ViewChild('test') public testBlock: ElementRef;
  @ViewChild('area') area: ElementRef;

  @Output() public fileUpload: EventEmitter<boolean> = new EventEmitter<boolean>();

  public data: any;
  public dataTemplate;
  public saveData;

  public clickItemId: number;

  public isEditName: boolean = false;
  public newName: string;

  public isOpenCheckBlock: boolean = false;
  public isUploadBlock: boolean = false;

  public fileLoad: boolean = false;
  public fileName: string;

  public isRepInput: boolean = false;

  public formatFile: any;

  public blockOut = [];

  constructor(
    private _renderer: Renderer2,
    public reportService: ReportServerConfiguratorService,
    public snackBar: SnackBarService
    ) { }

  ngOnInit(): void {
    this.getRecord();
  }

  @HostListener('document:resize', ['$event'])
  OnResize(event) {
    this.blockNeed();
    this.setStyleScroll();
  }

  setStyleScroll(): void {
    const rightScroll = document.getElementById('rightScrollAddReport');
    const leftScroll = document.getElementById('leftScrollAddReport');

    if (rightScroll) {
      if (rightScroll.scrollHeight !== rightScroll.clientHeight) {
        rightScroll.style.cssText = "margin-left: 5px; width: calc(100% - 5px);";
      } else {
        rightScroll.style.cssText = "margin-left: 10px; width: calc(100% - 10px);";

      }
    }

    if (leftScroll) {
      if (leftScroll.scrollHeight !== leftScroll.clientHeight) {
        leftScroll.style.cssText = "margin-right: 0px; width: calc(100% - 5px);";
      } else {
        leftScroll.style.cssText = "margin-right: -5px; width: calc(100% - 5px);";
      }
    }
  }

  onOpenUpload(): void {
    this.isUploadBlock = true;
  }

  handleFileInput(event): void {
    let file = event[0];
    const type_file = file.name.split('.').pop();
    if (type_file === "xls" || type_file === "xlsm" || type_file === "xlsx") {
      let reader = new FileReader();
      reader.readAsBinaryString(file);
      this.reportService.pushReportFile(file).subscribe(ans => {
        this.fileLoad = true;
        this.fileName = event[0].name;
        const body: IFileTemplate = {
          name: this.fileName,
          description: '',
          fileId: ans,
        };
        this.reportService.postReportFileTemplate(body).subscribe(ans2 => {
          this.getRecord();
          this.fileUpload.emit(true);
          setTimeout(() => {
            this.isUploadBlock = false;
            this.fileLoad = false;
          }, 1500);
        }, (error) => {
          this.fileLoad = false;
          this.snackBar.openSnackBar('Ошибка загрузки', 'snackbar-red');
        });
      },
        (error) => {
          this.snackBar.openSnackBar('Сервер не отвечает', 'snackbar-red');
        });
    } else {
      this.snackBar.openSnackBar('Не верный формат файла', 'snackbar-red');
    }
  }

  uploadClose(): void {
    this.isUploadBlock = false;
  }

  getRecord(): void {
    this.formatFile = [];
    this.reportService.getReportFileTemplate().subscribe(ans => {
      const filterData = [];
      for (const i of ans) {
        const type_file = i.name.split('.').pop();
        const objType = {
          id: i.id,
          type: type_file,
        };
        this.formatFile.push(objType);
        i.name = i.name.split('.').shift();
        filterData.push(i);
      }
      this.data = filterData;
      this.saveData = filterData;
      this.setStyleScroll();
    },
      (error) => {
        this.snackBar.openSnackBar('Сервер не отвечает', 'snackbar-red');
      });
  }

  postReportTemplate(template): void {
    this.reportService.postReportTemplate(template).subscribe(ans => {

    },
      (error) => {
        this.snackBar.openSnackBar('Сервер не отвечает', 'snackbar-red');
      });
  }

  deleteReportFile(item): void {
    const windowsParam = {
      isShow: true,
      questionText: 'Вы уверены, что хотите удалить файл?',
      acceptText: 'Да',
      cancelText: 'Нет',
      acceptFunction: () => this.reportService.deleteReportFileTemplate(item.id).subscribe(ans => {
        this.getRecord();
      },
        (error) => {
          this.snackBar.openSnackBar('Сервер не отвечает', 'snackbar-red');
        }),
      cancelFunction: () => {
        this.reportService.closeAlert();
      }
    };
    this.reportService.alertWindow$.next(windowsParam);
  }

  editNameReportFile(item): void {
    this.newName = item.name;
    item.edit = true;
  }

  onEditName(item): void {
    item.edit = false;
    let updFileTemplate;
    const format = this.formatFile.find(e => e.id === item.id).type;
    if (format === "xls" || format === "xlsm" || format === "xlsx") {
      updFileTemplate = {
        id: item.id,
        name: this.newName + '.' + format,
        description: item.description,
      };
    } else {
      updFileTemplate = {
        id: item.id,
        name: this.newName,
        description: item.description,
      };
    }

    const windowsParam = {
      isShow: true,
      questionText: 'Применить внесенные изменения?',
      acceptText: 'Да',
      cancelText: 'Нет',
      acceptFunction: () => {
        this.reportService.putReportFileTemplate(updFileTemplate).subscribe(ans => {
        },
          (error) => {
            this.snackBar.openSnackBar('Сервер не отвечает', 'snackbar-red');
          });
        item.name = this.newName;
        this.newName = null;
      },
      cancelFunction: () => {
        this.reportService.closeAlert();
        this.newName = null;
      }
    };
    this.reportService.alertWindow$.next(windowsParam);

  }

  getTemplate(item): void {
    this.clickItemId = item.id;
    this.reportService.getTepmplate(item.id).subscribe(ans => {
      this.dataTemplate = ans;
      this.blockNeed();
    },
      (error) => {
        this.snackBar.openSnackBar('Сервер не отвечает', 'snackbar-red');
      });
  }

  searchReport(event): void {
    const record = event.currentTarget.value.toLowerCase();
    if (event.key === "Backspace") {
      this.data = this.saveData;
    }
    const filterData = this.data.filter(
      (e) => e.name.toLowerCase().indexOf(record.toLowerCase()) > -1
    );

    this.data = filterData;
    if (!event.currentTarget.value) {
      this.data = this.saveData;
    }
  }

  dragOver(event: DragEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this._renderer.addClass(this.area.nativeElement, 'hover');
  }

  dragLeave(event: DragEvent): void {
    event.preventDefault();
    this._renderer.removeClass(this.area.nativeElement, 'hover');
  }

  dropFile(event: DragEvent): void {
    event.preventDefault();
    this._renderer.removeClass(this.area.nativeElement, 'hover');
    this.handleFileInput(event.dataTransfer.files);
  }

  blockNeed(): void {
    this.blockOut = [];
    if (this.dataTemplate !== undefined) {
      const heightTemplate = this.dataTemplate.length * 40;
      const heihtOut = (this.testBlock.nativeElement.clientHeight - heightTemplate) / 40;
      for (let i = 0; i < heihtOut - 1; i++) {
        this.blockOut.push(i);
      }
    }
  }

}
