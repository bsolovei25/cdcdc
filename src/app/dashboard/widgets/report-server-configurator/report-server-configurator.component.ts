import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReportServerConfiguratorService } from '../../services/report-server-configurator.service';
import { WidgetPlatform } from '../../models/widget-platform';

@Component({
    selector: 'evj-report-server-configurator',
    templateUrl: './report-server-configurator.component.html',
    styleUrls: ['./report-server-configurator.component.scss'],
    animations: [
        trigger('Branch', [
            state(
                'collapsed',
                style({
                    height: 0,
                    transform: 'translateY(-8px)',
                    opacity: 0,
                    overflow: 'hidden',
                })
            ),
            state(
                'expanded',
                style({
                    height: '*',
                    opacity: 1,
                })
            ),
            transition('collapsed => expanded', animate('150ms ease-in')),
            transition('expanded => collapsed', animate('150ms ease-out')),
        ]),
    ],
})
export class ReportServerConfiguratorComponent extends WidgetPlatform implements OnInit, OnDestroy {

    static itemCols = 18;
    static itemRows = 14;

    public isTable: boolean = true;

    public valueCheck: boolean;
    public valueUniqCheck: boolean;

    public addMenuClick: boolean = false;

    public isAddOptionsButton: boolean = false;

    public isRepInput: boolean = false;

    public isLongBlock: boolean = true;

    public indexColumn: number = 0;

    public isOpenCheckBlock: boolean = false;

    public isIdReport: number;

    public data;
    public options;
    public optionsActive = [];
    public optionsCustom = [];
    public reportTemplate = [];
    public dataFile;

    public clickPushRef: boolean = false;
    public clickPushRec: boolean = false;

    public newRecord: string;
    public newFolder: string;

    public folderActive: number;

    public connectedTo: any = [];

    public saveData: any = [];

    public selectFile;

    public popupUserParam: boolean = false;

    constructor(
        public widgetService: WidgetService,
        public reportService: ReportServerConfiguratorService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);
        this.widgetIcon = 'reference';
    }

    ngOnInit(): void {
        super.widgetInit();
        this.subscriptions.push(
            // this.getReportFolder(),
            this.getRecordFile(),
            this.getReportTemplate(),
            this.getOptions()
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }


    protected dataHandler(ref: any): void {
        //this.data = ref;
    }

    openTable(event): void {
        this.isTable = event;
    }

    getReportFolder() {
        return this.reportService.getTemplateFolder().subscribe(ans => {
            this.data = ans;
            this.saveData = ans;
            for (let item of this.data) {
                this.connectedTo.push(item.name);
            }
        });
    }

    getReportTemplate() {
        return this.reportService.getReportTemplate().subscribe((data) => {
            this.data = data;
        });
    }

    getOptions() {
        return this.reportService.getSystemOptions().subscribe((data) => {
            this.options = data;
        });
    }

    getReporting(id) {
        return this.reportService.getReporting(id).subscribe((ans) => {
            this.reportTemplate = ans;
            this.selectFile = ans.fileTemplate.name;
            this.optionsActive = ans.systemOptions;
            this.optionsCustom = ans.customOptions;
        });
    }

    getRecordFile() {
        return this.reportService.getReportFileTemplate().subscribe(ans => {
            this.dataFile = ans;
        });
    }

    onClickReference(data, index) {
        this.selectFile = null;
        this.isAddOptionsButton = true; // file
        this.folderActive = data.id;
        this.isIdReport = data.id;
        this.getReporting(data.id);
        data.open = !data.open;
        this.indexColumn = index;
        this.optionsActive = [];
    }

    onClickItemReference(item) {
        this.selectFile = null;
        this.isAddOptionsButton = true;
        //data.open = !data.open;
        this.isIdReport = item.id;
    }

    onClickParamReference(item) {
        if (item.systemOptionType === "customOptions") {
            this.popupUserParam = true;
        }
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex
            );
        }
    }

    onShowItem(item): void {
        item.open = !item.open;
    }

    addMenu() {
        this.addMenuClick = !this.addMenuClick;
    }

    changeSwap(item): void {
        item.checked = !item.checked;
        if (item.checked === true) {
            this.optionsActive.push(item);
        } else {
            let index = this.optionsActive.findIndex(e => e === item);
            this.optionsActive.splice(item, index);
        }
    }

    pushBlockInRef(): void {
        this.clickPushRef = true;
        this.addMenuClick = false;
    }

    pushBlockInRec(): void {
        this.clickPushRec = true;
        this.addMenuClick = false;
    }

    onPushFolder(): void {
        this.clickPushRef = false;
        const object = {
            name: this.newFolder,
        };
        if (this.newFolder.trim().length > 0 && this.newFolder !== undefined) {
            // this.data.push(object);
            this.reportService.postTemplateFolder(object).subscribe(ans => {
                this.getReportFolder();
            })
            this.newFolder = null;
        }
    }

    onPushReport(): void {
        this.clickPushRec = false;
        const object = {
            name: this.newRecord,
            folderId: this.folderActive,
        };
        if (this.newRecord.trim().length > 0 && this.newRecord !== undefined) {
            // this.data[this.indexColumn].columns.push(object);
            this.reportService.postReportTemplate(object).subscribe(ans => {
                this.getReportFolder();
            })
            this.newRecord = null;
        }
    }

    openCheckBoxBlock(): void {
        this.isOpenCheckBlock = !this.isOpenCheckBlock;
    }

    searchReportFolder(event) {
        if (event.key === "Backspace") {
            this.data = this.saveData;
        }
        const folder = event.currentTarget.value.toLowerCase();
        const filterData = this.data.filter(
            (e) => e.name.toLowerCase().indexOf(folder.toLowerCase()) > -1
        );

        this.data = filterData;
        if (!event.currentTarget.value) {
            this.data = this.saveData;
        }
    }

    saveReport(item) {
        const obj = {
            systemOptions: this.optionsActive,
            fileTemplate: this.selectFile,
        }
        //если папка
        // this.data.find(e => {
        //     if (e.id === this.folderActive) {
        //         e.templates.find(el => {
        //             if (el.id === item) {
        //                 objectRepot = el;
        //             }
        //         })
        //     }
        // })
        // let obj = {
        //     id: 0,
        //     name: objectRepot.name,
        //     fileTemplate: this.selectFile,
        //     createdAt: new Date(),
        // }

        this.reportService.postSystemOptions(item, obj).subscribe(ans => {
            console.log(ans);
        });
    }


    closeOptions(event) {
        this.popupUserParam = event;
    }


}
