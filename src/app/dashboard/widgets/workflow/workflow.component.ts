import { Component, OnInit, OnDestroy, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { GridsterConfig, GridsterItem, GridType, GridsterItemComponentInterface } from 'angular-gridster2';
import { WorkflowService } from '../../services/widgets/workflow.service';
import { MatSelectChange } from '@angular/material/select';
import 'leader-line';
import { IAlertWindowModel } from '../../../@shared/models/alert-window.model';
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

@Component({
    selector: 'evj-workflow',
    templateUrl: './workflow.component.html',
    styleUrls: ['./workflow.component.scss'],
})
export class WorkflowComponent implements
    OnInit, OnDestroy, AfterViewInit {
    //     export class WorkflowComponent extends WidgetPlatform implements
    // OnInit, OnDestroy, AfterViewInit {

    public options: GridsterConfig;
    public items: IGridsterItemLocal[] = [];

    public ColWidth: number = 10;
    public RowHeight: number = 10;

    private itemCol: number = 4;
    private itemRow: number = 4;

    private sizeTimeout: any;

    alert: IAlertWindowModel;

    leaderLine = [];

    modules: IModules[];
    chooseModules: IModules;

    scenarios: IScenarios[];
    chooseScenarios: IScenarios;

    actions: IActions[];

    availbleActions: IActionsScenario;

    activeActions: IGridsterItemLocal;

    isLoading: boolean = false;

    @ViewChild('splitBar') splitBar: ElementRef<HTMLElement>;
    @ViewChild('splitTop') splitTop: ElementRef<HTMLElement>;
    @ViewChild('containerWorkflow') containerWorkflow: ElementRef<HTMLElement>;

    constructor(
        public widgetService: WidgetService,
        private renderer: Renderer2,
        private workflowService: WorkflowService,
        // @Inject('isMock') public isMock: boolean,
        // @Inject('widgetId') public id: string,
        // @Inject('uniqId') public uniqId: string
    ) {
        // super(widgetService, isMock, id, uniqId);

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
        // super.widgetInit();
        this.loadItem();
    }

    ngAfterViewInit(): void {
        this.slider();
    }

    ngOnDestroy(): void {
        // super.ngOnDestroy();
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
                    clearInterval(value.setInterval);
                    value.remove();
                });
            }
            // this.items = [];
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
            const a = e.screenY - y - 140;
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

    // //#endregion

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
        // if (this.leaderLine.length > 0) {
        //     this.leaderLine.forEach(value => {
        //         clearInterval(value.setInterval);
        //         value.remove();
        //     });
        // }
        this.leaderLine = [];
        this.items.forEach(item => {
            if (item?.scenarioAction && item?.nextScenarioAction) {
                setTimeout(() => {
                    const a = new LeaderLine(
                        document.getElementById(item.scenarioAction),
                        document.getElementById(item.nextScenarioAction),
                        {
                            size: 2,
                            color: 'white'
                        }
                    );
                    this.leaderLine.push(a);
                    this.leaderLine.forEach(value => {
                        value.setInterval = setInterval(() => {
                            value.position();
                        }, 100);
                    });
                }, 100);
            }
        });

    }

    private async postScenarios(): Promise<void> {
        try {
            const a = await this.workflowService
                .postScenarios(this.chooseModules.uid, { name: 'scen1' });
        } catch (error) {
        }
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

    // //#endregion

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

    dragStartHandler(event: DragEvent, item: string): void {
        event.dataTransfer.setData('text/plain', item);
        event.dataTransfer.dropEffect = 'copy';
    }

    public dragStart(e: DragEvent, item: IGridsterItemLocal): void {
        e.dataTransfer.setData('text/plain', item.toString());
        e.dataTransfer.dropEffect = 'copy';
    }

    async emptyCellClick(event: DragEvent, item: IGridsterItemLocal): Promise<void> {
        const name = event.dataTransfer.getData('text');

        const el = this.actions.find(val => val.name === name);
        try {
            const newAction = await this.workflowService
                .postAddActionsInScenario(this.chooseModules.uid,
                    this.chooseScenarios.uid, el?.uid);
            item.cols = this.itemCol;
            item.rows = this.itemRow;
            item.type = name === 'SendEmail'
                || name === 'CheckWarning'
                || name === 'CheckExpired' ? name : null;
            item.scenarioAction = newAction.uid;
            this.items.push(item);
        } catch (error) {
        }
    }

    public itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
        const useItem = { ...item };
    }

    // #endregion

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
                this.alert = null;
                this.createСonnection(body);
            },
            closeFunction: () => { },
            cancelFunction: () => {
                this.alert = null;
            }
        };
        this.alert = windowsParam;
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

    chooseGridItem(event: MouseEvent, item: IGridsterItemLocal): void {
        event.stopPropagation();
        if (!item) {
            this.activeActions = null;
        }
        if (this.activeActions === item) {

        } else {
            if (this.activeActions) {
                const previousScenarioAction: string = this.activeActions.scenarioAction;
                const id: string = item.scenarioAction;

                this.putConnect(previousScenarioAction, id);
                this.activeActions = item;
            } else {
                this.activeActions = item;
            }
        }
    }

    deleteAction(scenarioAction: string): void {
        const windowsParam: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы уверены, что хотите удалить?',
            acceptText: 'Удалить',
            cancelText: 'Нет',
            acceptFunction: async (): Promise<void> => {
                this.alert = null;
                this.isLoading = true;
                try {
                    await this.workflowService
                        .deleteActionsScenario(this.chooseModules.uid,
                            this.chooseScenarios.uid, scenarioAction);
                    const idx = this.items.findIndex(val => val.scenarioAction === scenarioAction);
                    if (idx >= 0) {
                        this.items.splice(idx, 1);
                    }
                    this.isLoading = false;
                } catch (error) {
                    this.isLoading = false;
                }
            },
            closeFunction: () => { },
            cancelFunction: () => {
                this.alert = null;
            }
        };
        this.alert = windowsParam;

    }

}
