import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef, HostListener } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReportServerConfiguratorService } from '../../services/report-server-configurator.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { SnackBarService } from '../../services/snack-bar.service';
import { ITreeState, ITreeOptions, TreeDraggedElement, TreeComponent } from 'angular-tree-component';
import { v4 } from 'uuid';
import { templateJitUrl } from '@angular/compiler';

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
    providers: [TreeDraggedElement]
})
export class ReportServerConfiguratorComponent extends WidgetPlatform implements OnInit, OnDestroy {

    @ViewChild(TreeComponent) private tree: TreeComponent;

    static itemCols = 18;
    static itemRows = 14;

    public isLoading: boolean = false;

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

    public addItem: boolean = false;

    public data;
    public options;
    public optionsActive: any = [];
    public optionsCustom: any = [];
    public reportTemplate = [];
    public dataFile;

    public createFolder: boolean = false;

    public createReport: boolean = false;

    public newRecord: string;
    public newFolder: string;

    public folderActive: number;
    public folderIdActive: number;

    public connectedTo: any = [];

    public saveData: any = [];

    public selectFile;

    public popupUserOptions: boolean = false;
    public popupUserCustomOptions: boolean = false;
    public popupOptionsActive: string;

    constructor(
        public widgetService: WidgetService,
        public reportService: ReportServerConfiguratorService,
        private materialController: SnackBarService,
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
            this.getReportFolder(),
            this.getRecordFile(),
            this.getReportTemplate(),
        );
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    @HostListener('document:resize', ['$event'])
    OnResize(event) {
        this.setStyleScroll();
    }


    setStyleScroll() {
        const rightScroll = document.getElementById('rightScrollReportConfig');
        const leftScroll = document.getElementById('leftScrollReportConfig');

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


    protected dataHandler(ref: any): void {
        //this.data = ref;
    }

    openTable(event): void {
        this.isTable = event;
    }

    dataFolder: any = [];

    getReportFolder() {
        return this.reportService.getTemplateFolder().subscribe(ans => {
            this.dataFolder = this.mapDataFolder(ans);
        });
    }

    getReportTemplate() {
        return this.reportService.getReportTemplate().subscribe((data) => {
            this.data = data;

            this.setStyleScroll();
        });
    }

    getOptions() {
        return this.reportService.getSystemOptions().subscribe((data) => {
            this.mapOptions(data);
        });
    }

    getReporting(id) {
        this.selectFile = {}
        this.isLoading = true;
        return this.reportService.getReporting(id).subscribe((ans) => {
            if (ans?.fileTemplate) {
                this.selectFile = ans.fileTemplate;
            }
            this.reportTemplate = ans;
            this.optionsActive = ans.systemOptions;
            this.optionsCustom = ans;
            this.isLoading = false;
            this.setStyleScroll();
        });
    }

    getRecordFile() {
        return this.reportService.getReportFileTemplate().subscribe(ans => {
            this.dataFile = ans;
        });
    }

    mapDataFolder(data) {
        const test = [];
        for (let i of data) {
            let obj = {
                id: 'folder' + i.id,
                idFolder: i.id,
                name: i.name,
                type: 'Folder',
                children: this.mapDataFolder(i?.childFolders),
            }
            for (let temp of i.templates) {
                let templateObj = {
                    id: 'temp' + temp.id,
                    idTemplate: temp.id,
                    name: temp.name,
                    type: 'Template',
                    folderId: temp.folderId,
                    displayName: temp.displayName,
                    createdBy: temp.createdBy,
                    createdAt: temp.createdAt,
                    isDeleted: temp.isDeleted,
                    children: [],
                }
                obj.children.push(templateObj);
            }
            test.push(obj);
        }
        return test;
    }

    mapOptions(data) {
        this.options = data;
        for (let i of this.options) {
            for (let j of this.optionsActive) {
                if (i.id === j.templateSystemOption.id) {
                    i.isActive = true;
                }
            }
        }
    }

    onEdit(item) {
        item.openEdit = true;
    }

    editReference(item) {
        item.openEdit = false;
        const obj = {
            folderId: item.folderId,
            id: item.idTemplate,
            name: item.name,
            createdAt: item.createdAt,
            createdBy: item.createdBy,
            displayName: '',
            isDeleted: item.isDeleted,
        }
        this.putReportTemplate(obj);
    }

    putReportTemplate(obj) {
        this.reportService.putReportTemplate(obj).subscribe((ans) => {
            this.getReportTemplate();
        });
    }

    deleteReportTemplate(item) {
        this.isLoading = true;
        this.reportService.deleteReportTemplate(item.idTemplate).subscribe((ans) => {
            this.isLoading = false;
            this.getReportTemplate();
        });
    }

    onClickReference(data, index) {
        this.getReporting(data.idTemplate);
        this.isAddOptionsButton = true; // file
        this.isIdReport = data.idTemplate;
        data.open = !data.open;
        this.indexColumn = index;
        this.optionsActive = [];

        this.setStyleScroll();
    }

    onClickItemReference(item) {
        this.selectFile = null;
        this.isAddOptionsButton = true;
        //data.open = !data.open;
        this.isIdReport = item.idTemplate;
    }

    onClickParamReference(item) {
        switch (item.templateSystemOption.systemOptionType) {
            case 'customOptions':
                this.popupOptionsActive = "customOptions";
                this.popupUserCustomOptions = true;
                break;
            case 'maxReportSizeInMb':
                this.popupOptionsActive = "maxReportSizeInMb";
                break;
            case 'doRemoveFormulas':
                this.popupOptionsActive = "doRemoveFormulas";
                break;
            case 'doRemoveMacro':
                this.popupOptionsActive = "doRemoveMacro";
                break;
            case 'customOptions':
                this.popupOptionsActive = "customOptions";
                break;
            case 'autogenerate':
                this.popupOptionsActive = "autogenerate";
                break;
            case 'pathEdit':
                this.popupOptionsActive = "pathEdit";
                break;
            case 'macroEdit':
                this.popupOptionsActive = "macroEdit";
                break;
            case 'reportSheets':
                this.popupOptionsActive = "reportSheets";
                break;
            case 'parameterValuesAutogeneration':
                this.popupOptionsActive = "parameterValuesAutogeneration";
                break;
            case 'periodEdit':
                this.popupOptionsActive = "periodEdit";
                break;
        }
        this.popupUserOptions = true;
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
        item.isActive = !item.isActive;
        let obj = {
            templateSystemOption: item,
            value: '',
        }
        if (item.isActive) {
            this.optionsActive.push(obj);
        } else {
            const index = this.optionsActive.findIndex(e => e.templateSystemOption.id === item.id);
            this.optionsActive.splice(index, 1);
        }
    }

    pushBlockInRef(): void {
        if (!this.folderActive) {
            this.materialController.openSnackBar(
                'Выберите папку'
            );
        }
        this.addItem = true;
        this.createReport = false;
        this.createFolder = true;
        this.addMenuClick = false;
    }

    pushBlockInRec(): void {
        if (!this.folderActive) {
            this.materialController.openSnackBar(
                'Выберите папку'
            );
        }
        this.addItem = true;
        this.createFolder = false;
        this.createReport = true;
        this.addMenuClick = false;
    }

    onPushFolder(): void {
        this.createFolder = false;
        const object = {
            name: this.newFolder,
        };
        if (this.newFolder.trim().length > 0 && this.newFolder !== undefined) {
            // this.data.push(object);
            this.reportService.postTemplateFolder(object).subscribe(ans => {
                this.getReportFolder();
            });
            this.newFolder = null;
        }
    }

    onPushReport(): void {
        this.isLoading = true;
        const object = {
            name: this.newRecord,
            folderId: this.folderActive,
        };
        if (this.newRecord.trim().length > 0 && this.newRecord !== undefined) {
            if (this.createFolder) {
                this.reportService.postTemplateFolder(object).subscribe(ans => {
                    this.addItem = false;
                    this.isLoading = false;
                    this.getReportFolder();
                });
            }

            if (this.createReport) {
                this.reportService.postReportTemplate(object).subscribe(ans => {
                    this.addItem = false;
                    this.isLoading = false;
                    this.getReportFolder();
                });
            }
            this.newRecord = null;
        }
    }

    openCheckBoxBlock(): void {
        this.getOptions();
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
        let optionObject = [];
        let objItem;

        for (let i of this.optionsActive) {
            objItem = {
                templateSystemOption: {
                    id: i.templateSystemOption.id
                },
                value: '',
            }

            optionObject.push(objItem);
        }

        const obj = {
            systemOptionValues: optionObject,
            fileTemplate: this.selectFile,
        }

        this.reportService.postSystemOptions(item, obj).subscribe(ans => {
            this.materialController.openSnackBar(
                'Файл-шаблон сохранен'
            );
            this.getReporting(this.isIdReport);
        });
    }


    closeOptions(event) {
        this.popupUserCustomOptions = event;
        this.popupUserOptions = event;
    }


    onChangeFile(event) {
        this.selectFile = this.dataFile.find(e => e.fileId === event);
    }

    /// test dnd

    state: ITreeState = {
        expandedNodeIds: {
            1: true,
            2: true
        },
        hiddenNodeIds: {},
        activeNodeIds: {}
    };

    optionsTest: ITreeOptions = {
        allowDrag: (node) => node,
        allowDrop: (element, { parent, index }) => parent.data.type === 'Folder',
        getNodeClone: (node) => ({
            ...node.data,
            id: this.randomInt(1, 1000000),
            name: `copy of ${node.data.name}`
        })
    };

    randomInt(min, max) {
        return min + Math.floor((max - min) * Math.random());
    }

    onFolder(event) {
        if (event.node.data.type === "Folder") {
            this.folderActive = event.node.idFolder;
            this.folderIdActive = event.node.id;
        }
    }

    onEventTree(event) {
        console.log(event);
    }

    onMovedItem(event) {
        console.log(event);
        if (event.node.type === "Folder") {
            const obj = {
                id: event.node.idFolder,
                name: event.node.name,
                parentFolderId: event.to.parent.idFolder,
            }
            this.reportService.putFolderTemplate(obj).subscribe(ans => {
            });
        } else if (event.node.type === "Template") {
            const obj = {
                createdAt: event.node.createdAt,
                createdBy: event.node.createdBy,
                isDeleted: event.node.isDeleted,
                displayName: event.node.displayName,
                id: event.node.idTemplate,
                name: event.node.name,
                folderId: event.to.parent.idFolder,
            }
            this.putReportTemplate(obj);
        }

    }

}
