import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { IReportTemplate } from '../../models/ADMIN/report-server';
import { ReportsService } from '../../services/widgets/admin-panel/reports.service';
import { TreeDraggedElement } from '@circlon/angular-tree-component';
import { SelectionModel } from '@angular/cdk/collections';

export interface IFolderReport {
    templates: IReportTemplate[];
    folders: ITemplateFolderLocal[];
}
interface IUIChilrdenFolders {
    id: number;
    name: string;
    templates: IReportTemplate[];
    children: IUIChilrdenFolders[];
}

interface ITemplateFolderLocal {
    id: number;
    name: string;
    templates: IReportTemplate[];
    childFolders: ITemplateFolderLocal[];
}

@Component({
    selector: 'evj-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent implements OnInit {
    public active: boolean = false;

    public datePicker: boolean = false;
    public datePickerOpen: number;
    private timerHwnd: number;

    selectedFolders: SelectionModel<number> = new SelectionModel<number>(true, []);
    activeElements: SelectionModel<number> = new SelectionModel<number>(true, []);

    data: IReportTemplate[] = [];
    dataFolder: IFolderReport;
    filterData: IReportTemplate[] = [];
    templates: IReportTemplate[] = [];
    folders: ITemplateFolderLocal[] = [];

    @Input()
    public panelActive: boolean = false;

    search: string = '';

    constructor(public widgetService: WidgetService, private reportsService: ReportsService) {}

    ngOnInit(): void {
        this.loadItem();
    }

    async loadItem(): Promise<void> {
        this.dataFolder = await this.reportsService.getTemplateFolder();
        this.folders = this.dataFolder.folders;
        this.templates = this.dataFolder.templates;
    }

    searchTemplate(data: ITemplateFolderLocal, search: string): void {
        data.templates.forEach((temp) => {
            if (temp.name.toLowerCase().includes(search)) {
                this.selectedFolders.select(data.id);
                this.activeElements.deselect(data.id);
            }
        });
    }

    searchChildren(data: ITemplateFolderLocal, search: string): void {
        if (data.name.toLowerCase().includes(search)) {
            this.selectedFolders.select(data.id);
            this.activeElements.deselect(data.id);
        }
        this.searchTemplate(data, search);

        data.childFolders.forEach((childFolder) => {
            const count = this.selectedFolders.selected.length;
            this.searchChildren(childFolder, search);
            if (this.selectedFolders.selected.length > count) {
                this.selectedFolders.select(childFolder.id);
                this.activeElements.deselect(childFolder.id);
            } else {
                this.activeElements.select(data.id);
            }
        });
    }

    searchTree(data: ITemplateFolderLocal[], search: string): void {
        data.forEach((item) => {
            const count = this.selectedFolders.selected.length;
            this.searchChildren(item, search);
            if (this.selectedFolders.selected.length > count) {
                this.selectedFolders.select(item.id);
                this.activeElements.deselect(item.id);
            } else {
                this.activeElements.select(item.id);
            }
            this.searchTemplate(item, search);
        });
    }

    searchReports(event: KeyboardEvent | string): void {
        if (typeof event !== 'string') {
            this.search = (event?.target as HTMLInputElement)?.value.toLowerCase();
        } else {
            this.search = event;
        }
        if (this.search === '') {
            this.activeElements.clear();
            this.selectedFolders.clear();
        } else {
            if (!this.timerHwnd) {
                // set timeout to resize chart
                this.timerHwnd = window.setTimeout(() => {
                    this.timerHwnd = 0;
                    this.activeElements.clear();
                    this.selectedFolders.clear();
                    this.searchTree(this.folders, this.search);
                    this.templates.forEach((val) => {
                        if (!val.name.toLowerCase().includes(this.search)) {
                            this.activeElements.select(val.id);
                        }
                    });
                }, 100);
            }
        }
    }
}
