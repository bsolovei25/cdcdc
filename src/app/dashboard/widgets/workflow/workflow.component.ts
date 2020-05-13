import { Component, OnInit, OnDestroy, Renderer2, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { GridsterConfig, GridsterItem, GridType, GridsterItemComponentInterface } from 'angular-gridster2';
import { WorkflowService } from '../../services/widgets/workflow.service';
import { MatSelectChange } from '@angular/material/select';
import 'leader-line';
import { IAlertWindowModel } from '../../../@shared/models/alert-window.model';
import { SnackBarService } from '../../services/snack-bar.service';
import { IAlertInputModel } from '../../../@shared/models/alert-input.model';
import { WidgetPlatform } from '../../models/widget-platform';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { IWorkspaceTable } from './workflow-table/workflow-table.component';
declare let LeaderLine: any;

export interface IModules {
    createdAt: Date;
    name: string;
    uid: string;
}

export interface IScenarios {
    createdAt: Date;
    name: string;
    status: 'stopped';
    uid: string;
    wfSystemUid: string;
}

export interface IActions {
    actionUrl: string;
    description: string;
    name: 'CheckWarning' | 'SendEmail';
    uid: string;
    wfSystemUid: string;
}

export interface IActionScenario {
    action: string;
    actionName: 'CheckWarning' | 'SendEmail' | 'CheckExpired';
    scenarioAction: string;
    previousScenarioAction: string;
    nextScenarioAction: string;
}

export interface IActionsScenario {
    data: {
        sortedActionList: IActionScenario[];
        withoutLinks: IActionScenario[];
    };
}

interface IGridsterItemLocal extends GridsterItem, IActionScenario {
    type: 'SendEmail' | 'CheckWarning' | 'CheckExpired';
}

interface ICreateConnection {
    scenario: {
        name: string;
    };
    actions: {
        scenarioAction: string;
        previousScenarioAction?: string;
        nextScenarioAction?: string;
    }[];
}

export interface IActionEmail {
    description: string;
    name: 'EmailSubject' | 'EmailTo' | 'EmailCopy' | 'EmailBody';
    type: 'textBox';
    uid: string;
}

export interface IActionTable {
    description: string;
    name: 'CheckWarningKey' | 'CheckWarningValue';
    type: 'textBox';
    uid: string;
}

@Component({
    selector: 'evj-workflow',
    templateUrl: './workflow.component.html',
    styleUrls: ['./workflow.component.scss'],
    providers: [
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
    ]
})

export class WorkflowComponent extends WidgetPlatform implements
    OnInit, OnDestroy, AfterViewInit {

    public options: GridsterConfig;
    public items: IGridsterItemLocal[] = [];

    public ColWidth: number = 10;
    public RowHeight: number = 10;

    private itemCol: number = 4;
    private itemRow: number = 4;

    private sizeTimeout: any;

    tableAction: IActionTable[] = [];
    emailAction: IActionEmail[] = [];

    alertWindow: IAlertWindowModel;
    alertInput: IAlertInputModel;

    alertWorkspaceTable: IWorkspaceTable;

    leaderLine = [];

    modules: IModules[];
    chooseModules: IModules;

    scenarios: IScenarios[];
    chooseScenarios: IScenarios;

    actions: IActions[];

    availbleActions: IActionsScenario;

    activeActions: IGridsterItemLocal;

    isLoading: boolean = false;


    dragItem: 'SendEmail' | 'CheckWarning' | 'CheckExpired';

    // Chips
    valueCtrl: FormControl = new FormControl();
    valuesInputChipsTo: string[] = [];
    valuesInputChipsCopy: string[] = [];
    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    @ViewChild('splitBar') splitBar: ElementRef<HTMLElement>;
    @ViewChild('splitTop') splitTop: ElementRef<HTMLElement>;
    @ViewChild('splitBottom') splitBottom: ElementRef<HTMLElement>;
    @ViewChild('containerWorkflow') containerWorkflow: ElementRef<HTMLElement>;

    @ViewChild('valueInputChips') valueInputChips: ElementRef<HTMLInputElement>;

    constructor(
        public widgetService: WidgetService,
        private renderer: Renderer2,
        private workflowService: WorkflowService,
        private snackBar: SnackBarService,
        @Inject('isMock') public isMock: boolean,
        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, isMock, id, uniqId);

        this.options = {
            gridType: GridType.Fixed,
            displayGrid: 'always',
            disableWindowResize: true,
            itemChangeCallback: this.itemChange.bind(this),
            enableEmptyCellClick: false,
            enableEmptyCellContextMenu: false,
            enableEmptyCellDrag: false,
            enableEmptyCellDrop: true,
            enableOccupiedCellDrop: false,
            emptyCellClickCallback: this.emptyCellClick.bind(this),
            emptyCellContextMenuCallback: this.emptyCellClick.bind(this),
            emptyCellDropCallback: this.emptyCellClick.bind(this),
            emptyCellDragCallback: this.emptyCellClick.bind(this),
            emptyCellDragMaxCols: 100000,
            emptyCellDragMaxRows: 100000,
            itemResizeCallback: this.resizeGridsterElement.bind(this),
            pushItems: false,
            minCols: 20,
            maxCols: 50,
            minRows: 20,
            maxRows: 50,
            margin: 1,
            setGridSize: false,
            mobileBreakpoint: 0,
            fixedColWidth: this.ColWidth,
            fixedRowHeight: this.RowHeight,
            draggable: {
                enabled: true,
            },
            swap: false,
        };
    }

    ngOnInit(): void {
        super.widgetInit();
        this.loadItem();
    }

    ngAfterViewInit(): void {
        this.slider();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    protected dataHandler(ref: any): void {
        if (ref) {
            // this.data = ref;
        }
    }

    async chooseSystem(item: MatSelectChange): Promise<void> {
        this.isLoading = true;
        this.chooseModules = item.value;
        this.loadScenarios(this.chooseModules.uid);
    }

    chooseScen(scen: IScenarios): void {
        this.chooseScenarios = this.chooseScenarios === scen ? null : scen;
        if (this.chooseScenarios) {
            this.isLoading = true;
            this.loadActions(this.chooseModules.uid);
        } else {
            if (this.leaderLine.length > 0) {
                this.leaderLine.forEach(value => {
                    value.setInterval = 0;
                    clearInterval(value.setInterval);
                    value.remove();
                });
            }
            this.items = [];
            this.leaderLine = [];
        }
    }

    // #region SLIDER

    slider(): void {
        let mouseIsDown = false;
        this.splitBar.nativeElement.addEventListener('mousedown', (e) => {
            mouseIsDown = true;
        });

        document.addEventListener('mousemove', (e) => {
            if (!mouseIsDown) {
                return;
            }
            const y = this.containerWorkflow.nativeElement.getBoundingClientRect().y;
            const a = e.screenY - y - 35;
            if (a < 50) {
                this.renderer.setStyle(this.splitTop.nativeElement, 'height', `${50}px`);
            } else {
                if (a > this.containerWorkflow.nativeElement
                    .getBoundingClientRect().height - 65) {
                    const height = this.containerWorkflow.nativeElement
                        .getBoundingClientRect().height;
                    const sum = height - 65;
                    this.renderer.setStyle(this.splitTop.nativeElement, 'height', `${sum}px`);
                } else {
                    this.renderer.setStyle(this.splitTop.nativeElement, 'height', `${a}px`);
                }
            }
        });

        document.addEventListener('mouseup', () => {
            mouseIsDown = false;
        });
    }

    // #endregion

    // #region LOAD

    private async loadItem(): Promise<void> {
        this.isLoading = true;
        const dataLoadQueue: Promise<void>[] = [];
        dataLoadQueue.push(
            this.workflowService.getWorkfkowModules()
                .then((data) => {
                    this.modules = data;
                })
        );
        if (dataLoadQueue.length > 0) {
            try {
                await Promise.all(dataLoadQueue);
                this.isLoading = false;
            } catch (err) {
                this.isLoading = false;
                console.error(err);
            }
        }
    }

    private async loadScenarios(idModule: string): Promise<void> {
        try {
            this.scenarios = await this.workflowService.getWorkfkowScenarios(idModule);
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
        }
    }

    private async loadActions(idModule: string): Promise<void> {
        try {
            this.actions = await this.workflowService.getWorkfkowActions(idModule);
            this.loadWorkfkowAvailbleActions();
        } catch (error) {
            console.error(error);
            this.isLoading = false;
        }
    }

    private async loadWorkfkowAvailbleActions(): Promise<void> {
        try {
            this.availbleActions = await this.workflowService
                .getWorkfkowAvailbleActions(this.chooseModules.uid, this.chooseScenarios.uid);
            this.drawingActions();
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
        }
    }

    drawingActions(): void {
        this.items = [];
        let x = 2;
        this.availbleActions.data.sortedActionList.forEach(sort => {
            this.items.push({
                x, y: 5,
                cols: this.itemCol, rows: this.itemRow,
                type: sort.actionName,
                action: sort.action,
                actionName: sort.actionName,
                scenarioAction: sort.scenarioAction,
                previousScenarioAction: sort.previousScenarioAction,
                nextScenarioAction: sort.nextScenarioAction
            });
            x += 6;
        });
        this.availbleActions.data.withoutLinks.forEach(sort => {
            this.items.push({
                x, y: 5,
                cols: this.itemCol, rows: this.itemRow,
                type: sort.actionName,
                action: sort.action,
                actionName: sort.actionName,
                scenarioAction: sort.scenarioAction,
                previousScenarioAction: sort.previousScenarioAction,
                nextScenarioAction: sort.nextScenarioAction
            });
            x += 6;
        });
        this.drawLeaderLine();
    }

    drawLeaderLine(): void {
        if (this.leaderLine.length > 0) {
            this.leaderLine.forEach(value => {
                clearInterval(value.setInterval);
                value.remove();
            });
        }
        this.leaderLine = [];
        this.items.forEach(item => {
            if (item?.scenarioAction && item?.nextScenarioAction) {
                setTimeout(() => {
                    this.leaderLine.push(new LeaderLine(
                        document.getElementById(item.scenarioAction),
                        document.getElementById(item.nextScenarioAction),
                        {
                            size: 2,
                            color: 'white'
                        }
                    ));
                    this.leaderLine.forEach(value => {
                        value.setInterval = setInterval(() => {
                            if (value?.options) {
                                value.position();
                            }
                        }, 100);
                    });
                }, 100);
            }
        });

    }

    startStopScenario(scenario: IScenarios): void {
        if (scenario.status === 'stopped') {
            this.startScenario(scenario.uid);
        } else {
            this.stopScenario(scenario.uid);
        }
    }

    async startScenario(scenarioId: string): Promise<void> {
        try {
            this.workflowService.putScenarioStart(this.chooseModules.uid, scenarioId);
        } catch (error) { }
    }

    async stopScenario(scenarioId: string): Promise<void> {
        try {
            this.workflowService.putScenarioStop(this.chooseModules.uid, scenarioId);
        } catch (error) { }
    }

    async postScenarios(): Promise<void> {
        const inputParam: IAlertInputModel = {
            title: 'Создание нового сценария',
            placeholder: 'Введите название',
            acceptText: 'Добавить',
            cancelText: 'Отмена',
            value: '',
            acceptFunction: async (name): Promise<void> => {
                this.alertInput = null;
                this.isLoading = true;
                try {
                    this.isLoading = true;
                    const ans = await this.workflowService
                        .postScenarios(this.chooseModules.uid, { name });
                    this.scenarios.push(ans);
                    this.snackBar.openSnackBar(`Сценарий ${ans.name} добавлен`);
                    this.isLoading = false;
                } catch (error) {
                    this.isLoading = false;
                }
            },
            cancelFunction: () => {
                this.alertInput = null;
            }
        };
        this.alertInput = inputParam;
    }

    putConnect(previousScenarioAction: string, id: string): void {
        const body: ICreateConnection = {
            scenario: {
                name: this.chooseScenarios.name
            },
            actions: [
                {
                    scenarioAction: previousScenarioAction,
                    nextScenarioAction: id
                },
                {
                    scenarioAction: id,
                    previousScenarioAction,
                }
            ]
        };

        const windowsParam: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы уверены, что хотите сделать связь?',
            acceptText: 'Да',
            cancelText: 'Нет',
            acceptFunction: () => {
                this.alertWindow = null;
                this.createСonnection(body);
            },
            closeFunction: () => { },
            cancelFunction: () => {
                this.alertWindow = null;
            }
        };
        this.alertWindow = windowsParam;
    }

    async createСonnection(body: ICreateConnection): Promise<void> {
        try {
            this.isLoading = true;
            await this.workflowService
                .putActionsConnections(this.chooseModules.uid, this.chooseScenarios.uid, body);
            await this.loadWorkfkowAvailbleActions();
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            console.error(error);
        }
    }


    // #endregion

    // #region GRIDSTER

    private initGridster() {

    }

    public sizeGrid(): void {
        const widthScreen = document.getElementById('gridSize').clientWidth;
        const heigthScreen = document.getElementById('gridSize').clientHeight;
        const widthScreenDefault = 1920;
        const heigthScreenDefault = 909;
        this.ColWidth = 20;
        this.RowHeight = 20;
        this.ColWidth *= (widthScreen - 660) / (widthScreenDefault - 660);
        this.RowHeight *= (heigthScreen - 329) / (heigthScreenDefault - 329);

        this.options.fixedColWidth = this.ColWidth;
        this.options.fixedRowHeight = this.RowHeight;

        this.changedOptions();
    }

    public onResize(): void {
        clearTimeout(this.sizeTimeout);
        this.sizeTimeout = setTimeout(() => this.sizeGrid(), 1000);
        this.resizeGridsterElement();
    }

    public resizeGridsterElement(): void {
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }

    public changedOptions(): void {
        if (this.options.api && this.options.api.optionsChanged) {
            this.options.api.optionsChanged();
        }
    }

    dragStartHandler(event: DragEvent, item: 'SendEmail' | 'CheckWarning' | 'CheckExpired'): void {
        this.dragItem = item;
        event.dataTransfer.dropEffect = 'copy';
    }

    async emptyCellClick(event: DragEvent, item: IGridsterItemLocal): Promise<void> {
        if (this.dragItem) {
            const el = this.actions.find(val => val.name === this.dragItem);
            try {
                const newAction = await this.workflowService
                    .postAddActionsInScenario(this.chooseModules.uid,
                        this.chooseScenarios.uid, el?.uid);
                item.cols = this.itemCol;
                item.rows = this.itemRow;
                item.type = this.dragItem;
                item.scenarioAction = newAction.uid;
                item.action = newAction.actionUid;


                this.items.push(item);
                this.snackBar.openSnackBar('Действие добавлено в сценарий');
            } catch (error) {
            }
        }
        this.dragItem = null;
    }

    public itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
        const useItem = { ...item };
    }

    // #endregion

    // #region  DELETE

    deleteAction(scenarioAction: string): void {
        const windowsParam: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы уверены, что хотите удалить?',
            acceptText: 'Удалить',
            cancelText: 'Нет',
            acceptFunction: async (): Promise<void> => {
                this.alertWindow = null;
                this.isLoading = true;
                try {
                    await this.workflowService
                        .deleteActionsScenario(this.chooseModules.uid,
                            this.chooseScenarios.uid, scenarioAction);
                    const idx = this.items.findIndex(val => val.scenarioAction === scenarioAction);
                    if (idx >= 0) {
                        this.items.splice(idx, 1);
                    }
                    this.snackBar.openSnackBar('Действие удалено');
                    this.isLoading = false;
                } catch (error) {
                    this.isLoading = false;
                }
            },
            closeFunction: () => { },
            cancelFunction: () => {
                this.alertWindow = null;
            }
        };
        this.alertWindow = windowsParam;
    }

    async deleteScenario(scenarioId: string): Promise<void> {
        const windowsParam: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы уверены, что хотите удалить?',
            acceptText: 'Удалить',
            cancelText: 'Нет',
            acceptFunction: async (): Promise<void> => {
                this.alertWindow = null;
                this.isLoading = true;
                try {
                    this.isLoading = true;
                    await this.workflowService.deleteScenario(this.chooseModules.uid, scenarioId);
                    const idx = this.scenarios.findIndex(val => val.uid === scenarioId);
                    if (idx >= 0) {
                        this.scenarios.splice(idx, 1);
                    }
                    this.isLoading = false;
                    this.snackBar.openSnackBar('Сценарий удален');
                } catch (error) {
                    this.isLoading = false;
                }
            },
            closeFunction: () => { },
            cancelFunction: () => {
                this.alertWindow = null;
            }
        };
        this.alertWindow = windowsParam;
    }

    // #endregion


    chooseGridItem(event: MouseEvent, item: IGridsterItemLocal): void {
        event.stopPropagation();
        if (!item) {
            this.activeActions = null;
        } else {
            if (this.activeActions !== item) {
                if (this.activeActions) {
                    const previousScenarioAction: string = this.activeActions.scenarioAction;
                    const id: string = item.scenarioAction;
                    this.putConnect(previousScenarioAction, id);
                    this.getScenarioActionProp(id);
                    this.getActionProp(item.action);
                    this.activeActions = item;
                } else {
                    this.getActionProp(item.action);
                    this.getScenarioActionProp(item.scenarioAction);
                    this.activeActions = item;
                }
            }
        }
    }

    async getScenarioActionProp(scenarioActionId: string): Promise<void> {
        try {
            this.isLoading = true;
            await this.workflowService
                .getScenarioActionProperties(this.chooseScenarios.uid, scenarioActionId);
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
        }
    }

    async getActionProp(actionId: string): Promise<void> {
        try {
            this.isLoading = true;
            const ans = await this.workflowService
                .getActionProperties(this.chooseModules.uid, actionId);
            const el = ans.find(val => val.name === 'EmailSubject');
            this.emailAction = [];
            this.tableAction = [];
            if (el) {
                this.emailAction = ans;
            } else {
                this.tableAction = ans;
            }
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
        }
    }


    // #region  Chips

    selected(event: MatAutocompleteSelectedEvent): void {
        this.valuesInputChipsTo.push(event.option.viewValue);
        this.valueInputChips.nativeElement.value = '';
        this.valueCtrl.setValue(null);
    }

    add(event: MatChipInputEvent): void {
        const input = event.input;
        const value = event.value;

        if ((value || '').trim()) {
            this.valuesInputChipsTo.push(value.trim());
        }

        if (input) {
            input.value = '';
        }

        this.valueCtrl.setValue(null);
    }

    remove(fruit: string): void {
        const index = this.valuesInputChipsTo.indexOf(fruit);
        if (index >= 0) {
            this.valuesInputChipsTo.splice(index, 1);
        }
    }

    // #endregion

    addUser(type: 'to' | 'copy'): void {
        const workspaceTable: IWorkspaceTable = {
            acceptFunction: (data) => {
                this.alertWorkspaceTable = null;
                data.forEach(val => {
                    if (type === 'to') {
                        this.valuesInputChipsTo.push(val.email);
                    } else {
                        this.valuesInputChipsCopy.push(val.email);
                    }
                });
            },
            cancelFunction: () => {
                this.alertWorkspaceTable = null;
            }
        };
        this.alertWorkspaceTable = workspaceTable;
    }

}
