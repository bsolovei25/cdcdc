import { Component, OnInit, Renderer2, ElementRef, ViewChild, HostListener } from '@angular/core';
import { ReportServerConfiguratorService } from 'src/app/dashboard/services/report-server-configurator.service';
import { IFileTemplate, IReportTemplate } from 'src/app/dashboard/models/report-server';
import { SnackBarService } from 'src/app/dashboard/services/snack-bar.service';

@Component({
  selector: 'evj-add-report-file',
  templateUrl: './add-report-file.component.html',
  styleUrls: ['./add-report-file.component.scss']
})
export class AddReportFileComponent implements OnInit {
  @ViewChild('test') public testBlock: ElementRef;
  @ViewChild('area') area: ElementRef;

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

  public blockOut = [];

  constructor(private _renderer: Renderer2, public reportService: ReportServerConfiguratorService, public snackBar: SnackBarService) { }

  ngOnInit(): void {
    this.getRecord();
  }

  @HostListener('document:resize', ['$event'])
  OnResize(event) {
    this.blockNeed();
  }

  onOpenUpload(): void {
    this.isUploadBlock = true;
  }


  handleFileInput(event) {
    let file = event[0];
    const type_file = file.name.split('.').pop();

    if (type_file === "xls" || type_file === "xlsm" || type_file === "xlsx") {
      let reader = new FileReader();
      reader.readAsBinaryString(file);
      this.reportService.pushReportFile(file).subscribe(ans => {
        this.fileLoad = true;
        this.fileName = event[0].name;
        let body: IFileTemplate = {
          name: this.fileName,
          description: '',
          fileId: ans,
        }
        this.reportService.postReportFileTemplate(body).subscribe(ans2 => {
          this.getRecord();
          setTimeout(() => {
            this.isUploadBlock = false;
            this.fileLoad = false;
          }, 1500);
        });
      });
    } else {
      this.snackBar.openSnackBar('Не верный формат файла', 'snackbar-red');
    }
  }

  uploadClose(): void {
    this.isUploadBlock = false;
  }

  getRecord() {
    this.reportService.getReportFileTemplate().subscribe(ans3 => {
      const filterData = [];
      for (const i of ans3) {
        i.name = i.name.split('.').shift();
        filterData.push(i);
      }
      this.data = filterData;
      this.saveData = filterData;
    });
  }

  postReportTemplate(template) {
    this.reportService.postReportTemplate(template).subscribe(ans => {

    });
  }

  deleteReportFile(item) {
    this.reportService.deleteReportFileTemplate(item.id).subscribe(ans => {
      this.getRecord();
    });
  }

  editNameReportFile(item) {
    item.edit = true;
  }

  onEditName(item) {
    item.edit = false;
    let updFileTemplate = {
      id: item.id,
      name: item.name,
      description: item.description,
    }
    this.reportService.putReportFileTemplate(updFileTemplate).subscribe(ans => {

    });
  }

  getTemplate(item): any {
    this.clickItemId = item.id;
    this.reportService.getTepmplate(item.id).subscribe(ans => {
      this.dataTemplate = ans;
      this.blockNeed();
    });
  }

  searchReport(event) {
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
