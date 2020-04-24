import { Component, OnInit, OnDestroy } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { IReportTemplate } from '../../models/report-server';
import { ReportsService } from '../../services/widgets/reports.service';
import { TreeDraggedElement } from 'angular-tree-component';

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
    providers: [TreeDraggedElement]
})
export class ReportsComponent implements OnInit, OnDestroy {

    public active: boolean = false;

    public datePicker: boolean = false;
    public datePickerOpen: number;

    data: IReportTemplate[] = [];
    dataFolder: IFolderReport;
    filterData: IReportTemplate[] = [];
    templates: IReportTemplate[] = [];
    folders: ITemplateFolderLocal[] = [];

    isReport: boolean = true;

    constructor(
        public widgetService: WidgetService,
        private reportsService: ReportsService,
    ) {
    }

    ngOnInit(): void {
        this.loadItem();
    }

    ngOnDestroy(): void {
    }

    toggle(): void {
        this.active = !this.active;
    }

    mapData(data: ITemplateFolderLocal[]): IUIChilrdenFolders[] {
        let newDate: IUIChilrdenFolders[] = [];
        data.forEach(val => {
            newDate.push({
                id: val.id,
                name: val.name,
                templates: val.templates,
                children: this.mapData(val.childFolders)
            });
        });
        return newDate;
    }

    async loadItem(): Promise<void> {
        const a = await this.reportsService.getReportsTemplate();
        this.dataFolder = await this.reportsService.getTemplateFolder();
        // this.folder = this.mapData(this.dataFolder.folders);
        this.folders = this.dataFolder.folders;
        this.templates = this.dataFolder.templates;
    }

    searchReports(event: KeyboardEvent): void {
        this.filterData = event ? this.data
            .filter(value => value.name.toLowerCase()
                .includes((event?.target as HTMLInputElement)?.value.toLowerCase())) : this.data;
    }

    onEvent(event) {
        console.log(event.node.data);
        this.filterData = event.node.data.templates;
    }

}
