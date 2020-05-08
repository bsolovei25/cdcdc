import { Component, OnInit, Inject, OnDestroy, Renderer2, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import { WidgetPlatform } from '../../models/widget-platform';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { GridsterConfig, GridsterItem, GridType, DisplayGrid, GridsterItemComponentInterface } from 'angular-gridster2';
import { IParamWidgetsGrid } from '../../components/new-widgets-grid/new-widgets-grid.component';
import { WorkflowService } from '../../services/widgets/workflow.service';
import { MatSelectChange } from '@angular/material/select';
import 'leader-line';
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

interface IGridsterItemLocal extends GridsterItem {
    id: string;
    type: 'SendEmail' | 'CheckWarning';
}

export interface IAvailableActions {
    action: string;
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

    private sizeTimeout: any;

    modules: IModules[];
    chooseModules: IModules;

    scenarios: IScenarios[];
    chooseScenarios: IScenarios;

    actions: IActions[];

    availbleActions: IAvailableActions[];

    activeActions: IGridsterItemLocal;

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
                enabled: true
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
        this.chooseModules = item.value;
        this.loadScenarios(this.chooseModules.uid);
    }

    chooseScen(scen: IScenarios): void {
        this.chooseScenarios = this.chooseScenarios === scen ? null : scen;
        this.loadActions(this.chooseModules.uid);
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
            } catch (err) {
                console.error(err);
            }
        }
    }

    private async loadScenarios(idModule: string): Promise<void> {
        try {
            this.scenarios = await this.workflowService.getWorkfkowScenarios(idModule);
        } catch (error) {
        }
    }

    private async loadActions(idModule: string): Promise<void> {
        try {
            this.actions = await this.workflowService.getWorkfkowActions(idModule);
            this.loadWorkfkowAvailbleActions(idModule);
        } catch (error) {
            console.error(error);
        }
    }

    private async loadWorkfkowAvailbleActions(idModule: string): Promise<void> {
        try {
            this.availbleActions = await this.workflowService
                .getWorkfkowAvailbleActions(idModule, this.scenarios?.[0].uid);
            await this.drawingActions();
            setTimeout(() => {
                const a = new LeaderLine(
                    document.getElementById('SendEmail'),
                    document.getElementById('CheckWarning'),
                    {
                        size: 2,
                        color: 'white'
                    }
                );

                setInterval(() => {
                    a.position();
                }, 100);
            }, 1000);

        } catch (error) {
        }
    }

    drawingActions(): void {
        let x = 2;
        let name1;
        let name2;
        this.availbleActions.forEach(value => {
            const action = this.actions.find(val => val.uid === value.action);
            if (action) {

                this.items.push({
                    x, y: 5, cols: 4, rows: 4,
                    type: action.name, id: value.action
                });
                x += 7;

                if (name1) {
                    name2 = action.name;
                }
                if (!name2) {
                    name1 = action.name;
                }
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

    // //#endregion

    // #region GRIDSTER

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
        console.log('empty cell click', event, item, name);
        item.cols = 3;
        item.rows = 3;
        item.type = name === 'SendEmail' || name === 'CheckWarning' ? name : null;
        this.items.push(item);


        const el = this.actions.find(val => val.name === name);
        await this.workflowService
            .postAddActionsInScenario(this.chooseModules.uid,
                this.scenarios?.[0].uid, el?.uid);
    }

    public itemChange(item: GridsterItem, itemComponent: GridsterItemComponentInterface): void {
        const useItem = { ...item };
        console.log(useItem);
        // itemComponent.item = {...itemComponent.item, ...itemComponent.$item};
    }

    // #endregion

    async  putConnect(id1, id2): Promise<void> {
        const body = {
            scenario: { name: this.chooseScenarios.name },
            actions: [
                {
                    action: id1,
                    nextAction: id2
                }, {
                    action: id2,
                    previousAction: id1,
                }
            ]
        };
        try {
            await this.workflowService
                .putActionsConnections(this.chooseModules.uid, this.chooseScenarios.uid, body);
        } catch (error) {
            console.error(error);
        }
    }


    chooseGridItem(i: IGridsterItemLocal): void {
        if (this.activeActions === i) {

        } else {
            if (this.activeActions) {
                const id1 = this.activeActions.id;
                const id2 = i.id;

                this.putConnect(id1, id2);
                this.activeActions = i;
            } else {
                this.activeActions = i;
            }
        }


    }
}
