import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef, HostListener } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { moveItemInArray, transferArrayItem, CdkDragDrop } from '@angular/cdk/drag-drop';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ReportServerConfiguratorService } from '../../services/report-server-configurator.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { SnackBarService } from '../../services/snack-bar.service';
import { ITreeState, ITreeOptions, TreeDraggedElement, TreeComponent } from 'angular-tree-component';
import { IReportTemplate, ITreeFolderMap, ITemplate, ISystemOptions, ITemplateFolder, IReportFile, ISystemOptionsTemplate, IFolder } from '../../models/report-server';
import { Subscription } from 'rxjs';


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

    public data: ITemplate[];
    public options: ISystemOptions[];
    public optionsActive: ISystemOptionsTemplate[];
    public optionsCustom: IReportTemplate;
    public reportTemplate: IReportTemplate;
    public dataFile: IReportFile[];

    public createFolder: boolean = false;

    public createReport: boolean = false;

    public newRecord: string;
    public newFolder: string;

    public folderActive: number;
    public folderIdActive: number;

    public saveData: ITemplate[];

    public selectFile: IReportFile;

    public dataFolder: ITreeFolderMap[];

    public popupUserOptions: boolean = false;
    public popupUserCustomOptions: boolean = false;
    public popupOptionsActive: string;

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


    setStyleScroll(): void {
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

    getReportFolder(): Subscription {
        return this.reportService.getTemplateFolder().subscribe(ans => {
            this.dataFolder = this.mapData(ans);
        });
    }

    getReportTemplate(): Subscription {
        return this.reportService.getReportTemplate().subscribe((data) => {
            this.data = data;
            this.setStyleScroll();
        });
    }

    // Get system-options
    getOptions(): Subscription {
        return this.reportService.getSystemOptions().subscribe((data) => {
            this.mapOptions(data);
        });
    }

    getReporting(id: number): Subscription {
        this.selectFile = {};
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

    getRecordFile(): Subscription {
        return this.reportService.getReportFileTemplate().subscribe(ans => {
            this.dataFile = ans;
        });
    }

    //Map answer for treeFolder
    mapData(data: IFolder): ITreeFolderMap[] {
        let dataTreeItem = [];
        dataTreeItem = this.mapDataFolder(data?.folders);
        for (let item of data.templates) {
            const templateObj = {
                id: 'temp' + item.id,
                idTemplate: item.id,
                name: item.name,
                type: 'Template',
                folderId: item.folderId,
                displayName: item.displayName,
                createdBy: item.createdBy,
                createdAt: item.createdAt,
                isDeleted: item.isDeleted,
                children: [],
            }
            dataTreeItem.push(templateObj);
        }
        const testObject = {
            id: 'default1',
            name: 'Файлы и папки',
            type: 'Folder',
            idFolder: 0,
            children: dataTreeItem,
        }
        const test = [];
        test.push(testObject);
        return test;
    }

    //Map folder for tree
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

    // Map choosen system-options
    mapOptions(data: ISystemOptions[]): void {
        this.options = data;
        for (let i of this.options) {
            for (let j of this.optionsActive) {
                if (i.id === j.templateSystemOption.id) {
                    i.isActive = true;
                }
            }
        }
    }

    onEdit(item): void {
        item.openEdit = true;
    }

    editReference(item): void {
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

    putReportTemplate(obj): void {
        this.reportService.putReportTemplate(obj).subscribe((ans) => {
            this.getReportTemplate();
        });
    }

    // Delete template

    deleteReportTemplate(item): void {
        this.isLoading = true;
        const windowsParam = {
            isShow: true,
            questionText: 'Вы уверены, что хотите удалить файл-шаблон?',
            acceptText: 'Да',
            cancelText: 'Нет',
            acceptFunction: () => this.reportService.deleteReportTemplate(item.idTemplate).subscribe(ans => {
                this.isLoading = false;
                this.getReportFolder();
            }, (error) => {
                this.isLoading = false;
            }),
            cancelFunction: () => this.reportService.closeAlert(),
        };
        this.reportService.alertWindow$.next(windowsParam);
    }

    //OnClick Template

    onClickReference(data, index): void {
        this.getReporting(data.idTemplate);
        this.isAddOptionsButton = true; // file
        this.isIdReport = data.idTemplate;
        data.open = !data.open;
        this.indexColumn = index;
        this.optionsActive = [];

        this.setStyleScroll();
    }

    //OnClick Template system-options

    onClickParamReference(item): void {
        if (item.templateSystemOption.
            systemOptionType === 'customOptions') {
            this.popupUserCustomOptions = true;
        }
        this.popupOptionsActive = item;
        this.popupUserOptions = true;
    }

    onShowItem(item): void {
        item.open = !item.open;
    }

    //Add input in tree

    addMenu(): void {
        this.addMenuClick = !this.addMenuClick;
    }

    //SWAP SYSTEM OPTIONS

    changeSwap(item): void {
        item.isActive = !item.isActive;
        const obj = {
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

    //PUSH INPUT FOR FOLDER/TEMPLATE

    pushBlockInRef(): void {
        this.addItem = true;
        this.createReport = false;
        this.createFolder = true;
        this.addMenuClick = false;
    }

    pushBlockInRec(): void {
        this.addItem = true;
        this.createFolder = false;
        this.createReport = true;
        this.addMenuClick = false;
    }

    //PUSH FOLDER/TEMLATE
    onPushReport(): void {
        this.isLoading = true;
        if (this.newRecord?.trim().length > 0 && this.newRecord !== undefined) {
            if (this.createFolder) {
                const object = {
                    name: this.newRecord,
                    parentFolderId: this.folderActive,
                };
                this.reportService.postTemplateFolder(object).subscribe(ans => {
                    this.addItem = false;
                    this.isLoading = false;
                    this.getReportFolder();
                });
            }

            if (this.createReport) {
                const object = {
                    name: this.newRecord,
                    folderId: (this.folderActive === 0) ? undefined : this.folderActive,
                };
                this.reportService.postReportTemplate(object).subscribe(ans => {
                    this.addItem = false;
                    this.isLoading = false;
                    this.getReportFolder();
                });
            }
            this.newRecord = null;
        } else {
            this.isLoading = false;
            this.addItem = false;
            this.newRecord = null;
        }
    }

    //OPEN SYSTEM-OPTIONS

    openCheckBoxBlock(): void {
        this.getOptions();
        this.isOpenCheckBlock = !this.isOpenCheckBlock;
    }

    //SAVE Template with system options

    saveReport(item): void {
        const optionObject = [];
        let objItem;

        for (let i of this.optionsActive) {
            objItem = {
                templateSystemOption: {
                    id: i.templateSystemOption.id
                },
                value: i.value,
            }

            optionObject.push(objItem);
        }

        const obj = {
            systemOptionValues: optionObject,
            fileTemplate: this.selectFile,
        }

        this.reportService.postSystemOptions(item, obj).subscribe((ans) => {
            this.materialController.openSnackBar(
                'Файл-шаблон сохранен'
            );
            this.getReporting(this.isIdReport);
        }, (error) => {
            this.materialController.openSnackBar(
                'Выберите файл'
            );
        });
    }

    closeOptions(event): void {
        if (event.close) {
            const date: Date = new Date(Date.now());
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();
            this.optionsActive.forEach(el => {
                if (el.id === event.systemIdChange) {
                    el.value = "Обновлено: " + day + '.' + month + '.' + year + 'г.';
                }
            });
        }
        this.popupUserCustomOptions = false;
        this.popupUserOptions = false;
    }

    onChangeFile(event): void {
        this.selectFile = this.dataFile.find(e => e.fileId === event);
    }

    randomInt(min, max): void {
        return min + Math.floor((max - min) * Math.random());
    }

    onFolder(event): void {
        if (event.type === "Folder") {
            this.folderActive = event.idFolder;
            this.folderIdActive = event.id;
        }
    }

    onEventTree(event) {
        // console.log(event);
    }

    // Drop on tree

    onMovedItem(event): void {
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

    updateFiletemplate(event): void {
        if (event) {
            this.getRecordFile();
        }
    }

    // Delete folder

    deleteFolder(item): void {
        this.isLoading = true;
        const windowsParam = {
            isShow: true,
            questionText: 'Вы уверены, что хотите удалить папку?',
            acceptText: 'Да',
            cancelText: 'Нет',
            acceptFunction: () => this.reportService.deleteFolder(item.idFolder).subscribe(ans => {
                this.isLoading = false;
                this.getReportFolder();
            }, (error) => {
                this.isLoading = false;
            }),
            cancelFunction: () => {
                this.reportService.closeAlert();
                this.isLoading = false;
            }
        };
        this.reportService.alertWindow$.next(windowsParam);
    }

}
