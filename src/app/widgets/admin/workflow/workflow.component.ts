import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Inject,
    ViewChildren,
    QueryList,
    HostListener,
} from '@angular/core';
import { WidgetService } from 'src/app/dashboard/services/widget.service';
import { GridsterConfig, GridsterItem, GridType, GridsterItemComponent } from 'angular-gridster2';
import { WorkflowService } from 'src/app/dashboard/services/widgets/admin-panel/workflow.service';
import { IAlertWindowModel } from '@shared/interfaces/alert-window.model';
import { SnackBarService } from 'src/app/dashboard/services/snack-bar.service';
import { IAlertInputModel } from '@shared/interfaces/alert-input.model';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { IWorkspaceTable } from './workflow-table/workflow-table.component';
import { IModules, IScenarios } from './workflow-list/workflow-list.component';
import { MatSelectChange } from '@angular/material/select';
import { WorkflowActions, WorkflowActionsNameMap } from 'src/app/dashboard/models/ADMIN/workflow.model';
import { trigger, transition, style, animate } from '@angular/animations';
import { WidgetPlatform } from 'src/app/dashboard/models/@PLATFORM/widget-platform';

declare let LeaderLine: any;

export interface IActions {
    actionUrl: string;
    description: string;
    name: string;
    uid: string;
    wfSystemUid: string;
}

export interface ICreateConnection {
    scenario: {
        name: string;
    };
    actions: {
        scenarioAction: string;
        previousScenarioAction?: string;
        nextScenarioAction?: string;
    }[];
}

export interface IActionScenario {
    action: string;
    actionName: string;
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
    type: string;
}

export interface IActionEmail {
    description: string;
    name: 'EmailSubject' | 'EmailTo' | 'EmailCopy' | 'EmailBody';
    type: 'textBox';
    uid: string;
}

export interface IActionEmailProps {
    propertyGuid: string;
    propertyName: 'EmailSubject' | 'EmailTo' | 'EmailCopy' | 'EmailBody';
    value: string;
}

export interface IActionEmailPropsUI {
    emailSubject: string;
    emailTo: FormControl;
    emailToArray: string[];
    emailCopy: FormControl;
    emailCopyArray: string[];
    emailBody: string;
}

export interface IActionTable {
    description: string;
    name: 'CheckWarningKey' | 'CheckWarningValue';
    type: 'textBox';
    uid: string;
}

export interface IActionTableProp {
    propertyGuid: string;
    propertyName: 'CheckWarningKey' | 'CheckWarningValue';
    value: string;
}

export interface IActionCombobox {
    description: string;
    name: string;
    source: {
        id: number;
        name: string;
        wfPropertyUid: string;
    }[];
    type: string;
    uid: string;
    value?: {
        id: number;
        name: string;
        wfPropertyUid: string;
    };
}

const fadeAnimation = trigger('fadeAnimation', [
    transition(':enter', [style({ opacity: 0, height: 0 }), animate('100ms', style({ opacity: 1, height: 10 }))]),
    transition(':leave', [style({ opacity: 1, height: 10 }), animate('100ms', style({ opacity: 0, height: 0 }))]),
]);

@Component({
    selector: 'evj-workflow',
    templateUrl: './workflow.component.html',
    styleUrls: ['./workflow.component.scss'],
    animations: [fadeAnimation],
    providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
})
export class WorkflowComponent extends WidgetPlatform<unknown> implements OnInit, OnDestroy, AfterViewInit {
    public ColWidth: number = 1;
    public RowHeight: number = 1;

    public items: IGridsterItemLocal[] = [];

    public workflowActionsNameMap = WorkflowActionsNameMap;
    public workflowActions: typeof WorkflowActions = WorkflowActions;

    private itemCol: number = 3;
    private itemRow: number = 3;

    private removableLeaderLineIds: Map<string, any> = new Map<string, any>();

    widthSvgIconGrid: 50;
    heightSvgIconGrid: 50;

    chooseModules: IModules;
    chooseScenarios: IScenarios;

    // tableAction: IActionTable[] = [];
    // tableActionProp: IActionTableProp[] = [];
    comboAction: IActionCombobox[] = [];
    emailAction: IActionEmail[] = [];
    emailPropAction: IActionEmailProps[] = [];
    emailPropActionUI: IActionEmailPropsUI = {
        emailSubject: '',
        emailTo: new FormControl(''),
        emailToArray: [],
        emailCopy: new FormControl(''),
        emailCopyArray: [],
        emailBody: '',
    };

    alertWindow: IAlertWindowModel;
    alertInput: IAlertInputModel;

    alertWorkspaceTable: IWorkspaceTable;

    leaderLine = [];

    public readonly LEADER_LINE_HOST_CONTAINER: string = 'leader-line-host';

    public readonly LEADER_LINE_PARENT_CONTAINER: string = 'leader-line-parent';

    public readonly LEADER_LINE_HEIGHT: number = 2;

    public readonly LEADER_LINE_REMOVE_TEMPLATE: string = 'removeLineTemplate';

    public readonly LEADER_LINE_REMOVE_CONTAINER: string = 'leader-line-remove';

    actions: IActions[];

    availableActions: IActionsScenario;
    activeActions: IGridsterItemLocal;

    isLoading: boolean = false;

    dragItem: string;

    private timerHwnd: number;

    moveGridsterItem: any;
    validItem: boolean = true;

    startItemDrag: IGridsterItemLocal;
    stopItemDrag: IGridsterItemLocal;

    // Chips
    visible: boolean = true;
    selectable: boolean = true;
    removable: boolean = true;
    separatorKeysCodes: number[] = [ENTER, COMMA];

    emailText: string;

    public options: GridsterConfig = {
        gridType: GridType.Fixed,
        displayGrid: 'always',
        disableWindowResize: true,
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
        gridSizeChangedCallback: this.resizeGridsterElement.bind(this),
        itemValidateCallback: this.validatePosition.bind(this),
        pushItems: false,
        minCols: 5,
        maxCols: 100,
        minRows: 5,
        maxRows: 100,
        margin: 20,
        outerMarginTop: 10,
        outerMarginLeft: 10,
        outerMarginRight: 0,
        outerMarginBottom: 0,
        setGridSize: false,
        mobileBreakpoint: 0,
        fixedColWidth: this.ColWidth,
        fixedRowHeight: this.RowHeight,
        draggable: {
            enabled: true,
            start: this.startDrag.bind(this),
            stop: this.stopDrag.bind(this),
            dropOverItems: true,
            dropOverItemsCallback: this.overItems.bind(this),
        },
        swap: false,
    };

    resize: boolean = true;

    public scrolling: boolean = false;
    private timeout;

    @ViewChild('content') content: ElementRef<HTMLInputElement>;

    @ViewChild('valueInputChips') valueInputChips: ElementRef<HTMLInputElement>;

    // slider vertical
    @ViewChild('splitVertivalBar') splitVertivalBar: ElementRef<HTMLElement>;
    @ViewChild('splitLeft') splitLeft: ElementRef<HTMLElement>;
    @ViewChild('containerWorkflowScenario') containerWorkflowScenario: ElementRef<HTMLElement>;

    // slider horisontal
    @ViewChild('splitBar') splitBar: ElementRef<HTMLElement>;
    @ViewChild('splitTop') splitTop: ElementRef<HTMLElement>;
    @ViewChild('splitBottom') splitBottom: ElementRef<HTMLElement>;
    @ViewChild('containerWorkflow') containerWorkflow: ElementRef<HTMLElement>;

    @ViewChildren('line') lines: QueryList<GridsterItemComponent>;

    @HostListener('window:scrollEnd', ['$event'])
    scrollHandler(event): void {
        if (!this.scrolling) {
            this.removeIconsLeaderLine();
        }
        this.leaderLineUpdatePosition();
        this.scrolling = true;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.drawRemoveIcons();
            this.scrolling = false;
        }, 200);

        // this.removeIconsLeaderLine();
    }

    constructor(
        public widgetService: WidgetService,
        private renderer: Renderer2,
        private workflowService: WorkflowService,
        private snackBar: SnackBarService,

        @Inject('widgetId') public id: string,
        @Inject('uniqId') public uniqId: string
    ) {
        super(widgetService, id, uniqId);
    }

    ngOnInit(): void {
        super.widgetInit();
    }

    ngAfterViewInit(): void {
        this.slider();
        this.sliderLeftBar();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.leaderLine = [];
        this.removeIconsAndLineLeaderLine();
    }

    protected dataConnect(): void {
        super.dataConnect();
        this.workflowService.chooseModules$.subscribe((module) => {
            this.chooseModules = module;
        });
        this.workflowService.chooseScenario$.subscribe((scenario) => {
            this.resetScenario();
            this.chooseScenarios = scenario;
            if (this.chooseScenarios) {
                this.isLoading = true;
                this.loadActions(this.chooseModules.uid).then();
            } else {
                this.items = [];
                this.leaderLine = [];
            }
        });
    }

    protected dataHandler(ref: unknown): void {}

    resetScenario(isDeleteLeaderLine: boolean = true): void {
        if (isDeleteLeaderLine) {
            this.removeIconsAndLineLeaderLine();
            this.removableLeaderLineIds.clear();
        }
        this.emailPropActionUI = {
            emailSubject: '',
            emailTo: new FormControl(''),
            emailToArray: [],
            emailCopy: new FormControl(''),
            emailCopyArray: [],
            emailBody: '',
        };
        this.comboAction = null;
        this.emailAction = [];
        this.emailPropAction = [];
        this.activeActions = null;
    }

    // #region SLIDER

    slider(): void {
        let mouseIsDown = false;
        let el;
        this.splitBar?.nativeElement.addEventListener('mousedown', (e) => {
            mouseIsDown = true;
            el = this.containerWorkflow?.nativeElement.getBoundingClientRect();
        });

        document.addEventListener('mousemove', (e) => {
            if (!mouseIsDown) {
                return;
            }
            const y = el.y;
            const a = e.screenY - y - 125;
            if (a < 50) {
                this.renderer.setStyle(this.splitTop?.nativeElement, 'height', `${50}px`);
            } else {
                if (a > el.height - 65) {
                    const height = el.height;
                    const sum = height - 65;
                    this.renderer.setStyle(this.splitTop?.nativeElement, 'height', `${sum}px`);
                } else {
                    this.renderer.setStyle(this.splitTop?.nativeElement, 'height', `${a}px`);
                }
            }
        });

        document.addEventListener('mouseup', () => {
            mouseIsDown = false;
            this.resizeGridsterElement();
        });
    }

    sliderLeftBar(): void {
        let mouseIsDown = false;
        let x;
        this.splitVertivalBar?.nativeElement.addEventListener('mousedown', (e) => {
            mouseIsDown = true;
            x = this.splitLeft?.nativeElement.getBoundingClientRect().x;
        });

        document.addEventListener('mousemove', (e) => {
            if (!mouseIsDown) {
                return;
            }
            if (x) {
                const sum = e.x - x;
                if (sum < 150) {
                    this.renderer.setStyle(this.splitLeft?.nativeElement, 'width', `${0}px`);
                    this.renderer.setStyle(this.splitLeft?.nativeElement, 'min-width', `${0}px`);
                } else {
                    this.renderer.setStyle(this.splitLeft?.nativeElement, 'width', `${sum}px`);
                }
            }
        });

        document.addEventListener('mouseup', () => {
            mouseIsDown = false;
            this.resizeGridsterElement();
        });
    }

    // #endregion

    // #region LOAD

    private async loadActions(idModule: string): Promise<void> {
        try {
            this.actions = await this.workflowService.getWorkfkowActions(idModule);
            this.loadWorkflowAvailbleActions();
        } catch (error) {
            console.error(error);
            this.isLoading = false;
        }
    }

    private async loadWorkflowAvailbleActions(): Promise<void> {
        try {
            this.availableActions = await this.workflowService.getWorkfkowAvailbleActions(
                this.chooseModules.uid,
                this.chooseScenarios.uid
            );
            this.drawingActions();
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
        }
    }

    drawingActions(): void {
        this.items = [];
        let x = 2;
        this.availableActions.data.sortedActionList.forEach((sort) => {
            this.items.push({
                x,
                y: 3,
                cols: this.itemCol,
                rows: this.itemRow,
                type: sort.actionName,
                action: sort.action,
                actionName: sort.actionName,
                scenarioAction: sort.scenarioAction,
                previousScenarioAction: sort.previousScenarioAction ?? '',
                nextScenarioAction: sort.nextScenarioAction ?? '',
            });
            x += 4;
        });
        this.availableActions.data.withoutLinks.forEach((sort) => {
            this.items.push({
                x,
                y: 3,
                cols: this.itemCol,
                rows: this.itemRow,
                type: sort.actionName,
                action: sort.action,
                actionName: sort.actionName,
                scenarioAction: sort.scenarioAction,
                previousScenarioAction: sort.previousScenarioAction ?? '',
                nextScenarioAction: sort.nextScenarioAction ?? '',
            });
            x += 4;
        });
        this.drawLeaderLine();
    }

    drawLeaderLines(): void {
        this.removeIconsAndLineLeaderLine();
        this.leaderLine = [];
        this.removableLeaderLineIds.clear();

        if (this.leaderLine.length === 0) {
            this.items.forEach((item) => {
                if (item?.scenarioAction && item?.nextScenarioAction) {
                    setTimeout(() => {
                        const el1 = this.lines.find((el) => el.el.id === item.scenarioAction)?.el;
                        const el2 = this.lines.find((el) => el.el.id === item.nextScenarioAction)?.el;
                        if (el1 && el2) {
                            const leaderLine = new LeaderLine(
                                el1,
                                el2,
                                this.LEADER_LINE_HOST_CONTAINER,
                                this.LEADER_LINE_PARENT_CONTAINER,
                                {
                                    size: this.LEADER_LINE_HEIGHT,
                                    color: 'white',
                                    startSocket: 'auto',
                                }
                            );
                            this.leaderLine.push(leaderLine);
                            const removable = true; // TODO заменить на реальзый флаг
                            if (removable) {
                                this.removableLeaderLineIds.set(
                                    'line-' + item.scenarioAction + '-s-' + item.nextScenarioAction,
                                    leaderLine
                                );
                            }
                        }
                    }, 100);
                }
            });
            setTimeout(() => {
                if (this.removableLeaderLineIds.size > 0) {
                    this.drawRemoveIcons();
                }
            }, 101);
        }
    }

    drawLeaderLine(): void {
        if (this.lines.length > 0) {
            this.drawLeaderLines();
        } else {
            const subsr = this.lines.changes.subscribe((val) => {
                this.drawLeaderLines();
                subsr.unsubscribe();
            });
        }
    }

    private drawRemoveIcons(): void {
        this.removableLeaderLineIds.forEach((value: any, key: string) => {
            this.addRemoveIconToLine(key);
        });
    }

    private splitLine(lineId: string): string {
        const line = lineId?.slice(5, 41);
        return line;
    }

    private removeIconsLeaderLine(): void {
        this.removableLeaderLineIds.forEach((value, key) => {
            this.removeIconLeader(`cross-${key}`);
        });
    }

    private removeIconsAndLineLeaderLine(): void {
        this.removableLeaderLineIds.forEach((value, key) => {
            this.removeIconLeader(`cross-${key}`, key, value);
        });
    }

    private addRemoveIconToLine(lineId: string): void {
        // формируем id для будущего элемента с иконкой
        const iconId = 'cross-' + lineId;

        if (document.getElementById(iconId) || !document.getElementById(lineId)) {
            return;
        }

        // клонируем макет верстки для отображения иконки и подставляем сформированный id
        const clone = document.getElementById(this.LEADER_LINE_REMOVE_TEMPLATE).cloneNode(true);
        clone['id'] = iconId;
        document.getElementById(this.LEADER_LINE_HOST_CONTAINER).appendChild(clone);

        // получаем элемент иконки, контейнера стрелки, svg dom стрелки
        const iconNode = document.getElementById(iconId);
        const parentNode = document.getElementById(this.LEADER_LINE_PARENT_CONTAINER);
        const arrowNode = document.querySelector('#' + lineId + ' g use');

        let verticalOffset = arrowNode.getBoundingClientRect().top - parentNode.getBoundingClientRect().top;
        let horizontalOffset = arrowNode.getBoundingClientRect().left - parentNode.getBoundingClientRect().left;

        const startEndNodesArr = lineId.substr(5).split('-s-');
        const startNode = document.getElementById(startEndNodesArr[0]);
        const endNode = document.getElementById(startEndNodesArr[1]);

        const yPos = startNode.getBoundingClientRect().y <= endNode.getBoundingClientRect().y;
        const xPos = startNode.getBoundingClientRect().x <= endNode.getBoundingClientRect().x;

        if (yPos) {
            verticalOffset = verticalOffset - iconNode.getBoundingClientRect().height / 2;
        } else {
            verticalOffset =
                verticalOffset + arrowNode.getBoundingClientRect().height - iconNode.getBoundingClientRect().height / 2;
        }

        if (!xPos) {
            horizontalOffset =
                +horizontalOffset +
                arrowNode.getBoundingClientRect().width -
                iconNode.getBoundingClientRect().width / 2;
        }

        iconNode.style.left = horizontalOffset.toString() + 'px';
        iconNode.style.top = verticalOffset.toString() + 'px';

        iconNode.addEventListener('click', ($event: Event) => {
            this.onRemoveIconClick(iconId, lineId);
        });
    }

    private onRemoveIconClick(iconId: string, lineId?: string): void {
        this.deleteConnectActions(lineId);
    }

    private removeIconLeader(iconId: string, lineId?: string, lineObject?: any): void {
        try {
            document.getElementById(iconId)?.remove();
            if (lineObject && lineId) {
                document.body.appendChild(document.getElementById(lineId));
                lineObject.remove();
            }
            document.getElementById(lineId)?.remove();
        } catch (error) {
            console.error(error);
        }
    }

    deleteConnectActions(lineId: string): void {
        const windowsParam: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы уверены, что хотите удалить связь?',
            acceptText: 'Удалить',
            cancelText: 'Нет',
            acceptFunction: () => {
                this.alertWindow = null;
                const id = this.splitLine(lineId);
                let nextId: string = id;
                this.items.map((value) => {
                    if (id === value.scenarioAction) {
                        value.nextScenarioAction = '';
                    }
                    if (nextId === value.previousScenarioAction) {
                        value.previousScenarioAction = '';
                        value.nextScenarioAction = '';
                        nextId = value.scenarioAction;
                    }
                });
                this.putConnect(this.items);
            },
            closeFunction: () => {},
            cancelFunction: () => {
                this.alertWindow = null;
            },
        };
        this.alertWindow = windowsParam;
    }

    createConnection(targetScenarioActionId: string, sourceScenarioAction: string): IGridsterItemLocal[] {
        const items = [...this.items];

        const idx = this.items.findIndex((val) => val.scenarioAction === sourceScenarioAction);
        const itemScenarioAction = items[idx];
        items.splice(idx, 1);

        const idxNext = items.findIndex((val) => val.scenarioAction === targetScenarioActionId);

        let sourceId = sourceScenarioAction;
        items.map((value) => {
            if (value.previousScenarioAction === sourceId && value.scenarioAction !== items[idxNext].scenarioAction) {
                value.value.previousScenarioAction = '';
                sourceId = value.scenarioAction;
                value.nextScenarioAction = '';
            }
        });
        const itemPrevAction = items[idxNext - 1];
        items[idxNext].previousScenarioAction = itemScenarioAction.scenarioAction;
        itemScenarioAction.nextScenarioAction = items[idxNext].scenarioAction;
        if (itemPrevAction) {
            itemPrevAction.nextScenarioAction = itemScenarioAction.scenarioAction;
        }

        items.splice(idxNext, 0, itemScenarioAction);

        return items;
    }

    async putConnect(arr: IGridsterItemLocal[]): Promise<void> {
        arr.map((value) => {
            if (value.previousScenarioAction === '') {
                value.previousScenarioAction = null;
            }
            if (value.nextScenarioAction === '') {
                value.nextScenarioAction = null;
            }
        });
        const body: ICreateConnection = {
            scenario: {
                name: this.chooseScenarios.name,
            },
            actions: [...arr],
        };
        try {
            this.isLoading = true;
            await this.workflowService.putActionsConnections(this.chooseModules.uid, this.chooseScenarios.uid, body);
            this.resetScenario();
            await this.loadWorkflowAvailbleActions();
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            console.error(error);
        }
    }

    // #endregion

    // #region GRIDSTER

    overItems(sourceItem: IGridsterItemLocal, targetItem: IGridsterItemLocal, grid): void {
        if (targetItem.scenarioAction !== sourceItem?.nextScenarioAction) {
            const windowsParam: IAlertWindowModel = {
                isShow: true,
                questionText: 'Вы уверены, что хотите сделать связь?',
                acceptText: 'Да',
                cancelText: 'Нет',
                acceptFunction: () => {
                    const arr = this.createConnection(targetItem.scenarioAction, sourceItem?.scenarioAction);
                    this.alertWindow = null;
                    this.putConnect(arr);
                },
                closeFunction: () => {},
                cancelFunction: () => {
                    this.alertWindow = null;
                },
            };
            this.alertWindow = windowsParam;
        }
    }

    public sizeGrid(): void {
        this.changedOptions();
    }

    leaderLineUpdatePosition(): void {
        this.leaderLine.forEach((val) => {
            val.position();
        });
    }

    validatePosition(item: GridsterItem): boolean {
        this.leaderLineUpdatePosition();
        return true;
    }

    startDrag(): void {
        this.removeIconsLeaderLine();
        this.resize = false;
    }

    stopDrag(): void {
        this.drawRemoveIcons();
        this.resize = true;
    }

    public onResize(): void {
        this.sizeGrid();
        this.resizeGridsterElement();
    }

    public resizeGridsterElement(): void {
        setTimeout(() => {
            if (this.resize) {
                this.changedOptions();
            }
        }, 2000);
        const event = new CustomEvent('resize');
        document.dispatchEvent(event);
    }

    public changedOptions(): void {
        if (!this.timerHwnd) {
            if (this.removableLeaderLineIds.size > 0 && this.leaderLine.length > 0) {
                this.drawLeaderLine();
            }
            this.timerHwnd = window.setTimeout(() => {
                this.timerHwnd = 0;
            }, 1000);
        }

        if (this.options.api && this.options.api.optionsChanged) {
            this.options.api.optionsChanged();
        }
    }

    dragStartHandler(event: DragEvent, item: string): void {
        if (this.chooseScenarios) {
            this.dragItem = item;
        }
        event.dataTransfer.dropEffect = 'copy';
    }

    async emptyCellClick(event: DragEvent, item: IGridsterItemLocal): Promise<void> {
        if (this.dragItem) {
            const el = this.actions?.find((val) => val.uid === this.dragItem);
            try {
                const newAction = await this.workflowService.postAddActionsInScenario(
                    this.chooseModules.uid,
                    this.chooseScenarios.uid,
                    el?.uid
                );
                item.cols = this.itemCol;
                item.rows = this.itemRow;
                item.type = el.name;
                item.scenarioAction = newAction.uid;
                item.action = newAction.actionUid;

                this.items.push(item);
                this.snackBar.openSnackBar('Действие добавлено в сценарий');
            } catch (error) {}
        }
        this.dragItem = null;
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
                    await this.workflowService.deleteActionsScenario(
                        this.chooseModules.uid,
                        this.chooseScenarios.uid,
                        scenarioAction
                    );
                    const idx = this.items.findIndex((val) => val.scenarioAction === scenarioAction);
                    if (idx >= 0) {
                        this.items.splice(idx, 1);
                    }
                    this.snackBar.openSnackBar('Действие удалено');
                    this.isLoading = false;
                } catch (error) {
                    this.isLoading = false;
                }
            },
            closeFunction: () => {},
            cancelFunction: () => {
                this.alertWindow = null;
            },
        };
        this.alertWindow = windowsParam;
    }

    // #endregion

    async chooseGridItem(event: MouseEvent, item: IGridsterItemLocal): Promise<void> {
        event.stopPropagation();
        if (!item) {
            this.activeActions = null;
            this.resetScenario(false);
        } else {
            if (this.activeActions !== item) {
                this.emailAction = [];
                this.comboAction = null;
                await this.getActionProp(item.action);
                await this.getScenarioActionProp(item.scenarioAction);
                this.activeActions = item;
            }
        }
    }

    validateEmail(email: string): boolean {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async getScenarioActionProp(scenarioActionId: string): Promise<void> {
        try {
            this.isLoading = true;
            const ans = await this.workflowService.getScenarioActionProperties(
                this.chooseScenarios.uid,
                scenarioActionId
            );
            const el = ans.find((val) => val.propertyName === 'EmailSubject');
            if (el) {
                this.propsAction(ans);
            } else {
                ans.forEach((ansV) => {
                    this.comboAction.map((value) => {
                        if (value.uid === ansV.propertyGuid) {
                            value.source.forEach((valueSource) => {
                                if (valueSource.name === ansV.value) {
                                    value.value = valueSource;
                                    return value;
                                }
                                return value;
                            });
                        }
                    });
                });
            }
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
        }
    }

    propsAction(ans: IActionEmailProps[]): void {
        ans.forEach((val) => {
            switch (val.propertyName) {
                case 'EmailSubject':
                    this.emailPropActionUI.emailSubject = val.value;
                    break;
                case 'EmailTo':
                    if (val.value !== '') {
                        this.emailPropActionUI.emailToArray = val.value.split(';');
                    }
                    break;
                case 'EmailCopy':
                    if (val.value !== '') {
                        this.emailPropActionUI.emailCopyArray = val.value.split(';');
                    }
                    break;
                case 'EmailBody':
                    this.emailPropActionUI.emailBody = val.value;
                    break;
                default:
                    break;
            }
        });
    }

    async getActionProp(actionId: string): Promise<void> {
        try {
            this.isLoading = true;
            const ans = await this.workflowService.getActionProperties(this.chooseModules.uid, actionId);
            const el = ans.find((val) => val.name === 'EmailSubject');
            this.emailAction = [];
            if (el) {
                this.emailAction = ans;
            } else {
                if (this.comboAction) {
                    this.comboAction = [...this.comboAction, ...ans];
                } else {
                    this.comboAction = ans;
                }
                console.log(this.comboAction);
            }
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
        }
    }

    // #region  Chips

    add(event: MatChipInputEvent, type: 'to' | 'copy'): void {
        const input = event.input;
        const value = event.value;

        if (value !== '') {
            if (this.validateEmail(value)) {
                if ((value || '').trim()) {
                    if (type === 'to') {
                        this.emailPropActionUI.emailToArray.push(value.trim());
                    } else {
                        this.emailPropActionUI.emailCopyArray.push(value.trim());
                    }
                }

                if (input) {
                    input.value = '';
                }
                if (type === 'to') {
                    this.emailPropActionUI.emailTo.setValue(null);
                } else {
                    this.emailPropActionUI.emailCopy.setValue(null);
                }
            } else {
                this.snackBar.openSnackBar('Некорректно введен email', 'error');
            }
        }
    }

    remove(value: string, type: 'to' | 'copy'): void {
        if (type === 'to') {
            const index = this.emailPropActionUI.emailToArray.indexOf(value);
            if (index >= 0) {
                this.emailPropActionUI.emailToArray.splice(index, 1);
            }
        } else {
            const index = this.emailPropActionUI.emailCopyArray.indexOf(value);
            if (index >= 0) {
                this.emailPropActionUI.emailCopyArray.splice(index, 1);
            }
        }
    }

    // #endregion

    addUser(type: 'to' | 'copy'): void {
        console.log(this.content?.nativeElement?.getBoundingClientRect()?.height);
        const workspaceTable: IWorkspaceTable = {
            height: this.content?.nativeElement?.getBoundingClientRect()?.height,
            acceptFunction: (data) => {
                this.alertWorkspaceTable = null;
                data.forEach((val) => {
                    if (type === 'to') {
                        this.emailPropActionUI.emailToArray.push(val.email);
                    } else {
                        this.emailPropActionUI.emailCopyArray.push(val.email);
                    }
                });
            },
            cancelFunction: () => {
                this.alertWorkspaceTable = null;
            },
        };
        this.alertWorkspaceTable = workspaceTable;
    }

    onEmailText(event: string): void {
        this.emailText = event;
    }

    async saveProperty(): Promise<void> {
        if (this.emailAction.length > 0) {
            this.isLoading = true;
            this.emailAction.forEach(async (value) => {
                let body;
                if (value.name === 'EmailBody') {
                    body = { value: this.emailText };
                }
                if (value.name === 'EmailTo') {
                    const array = this.emailPropActionUI.emailToArray.join(';');
                    body = { value: array };
                }
                if (value.name === 'EmailCopy') {
                    const array = this.emailPropActionUI.emailCopyArray.join(';');
                    body = { value: array };
                }
                if (value.name === 'EmailSubject') {
                    body = { value: this.emailPropActionUI.emailSubject };
                }
                try {
                    await this.workflowService.putProps(
                        this.chooseScenarios.uid,
                        this.activeActions.scenarioAction,
                        value.uid,
                        body
                    );
                    this.isLoading = false;
                    this.snackBar.openSnackBar('Параметры сохранены');
                } catch (error) {
                    this.isLoading = false;
                }
            });
        }
    }

    async chooseActionScenario(event: MatSelectChange, item: IActionCombobox): Promise<void> {
        if (this.comboAction) {
            this.isLoading = true;
            const body = { value: event.value.name };
            try {
                await this.workflowService.putProps(
                    this.chooseScenarios.uid,
                    this.activeActions.scenarioAction,
                    item.uid,
                    body
                );
                this.isLoading = false;
                this.snackBar.openSnackBar('Параметры сохранены');
            } catch (error) {
                this.isLoading = false;
            }
        }
    }

    isSendMail(type: string): boolean {
        return type.toLowerCase().includes('SendEmail'.toLowerCase());
    }

    isTableEvent(type: string): boolean {
        return type.toLowerCase().includes('Event'.toLowerCase());
    }
}
