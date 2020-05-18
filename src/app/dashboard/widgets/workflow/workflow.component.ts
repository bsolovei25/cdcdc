import {
    Component,
    OnInit,
    OnDestroy,
    Renderer2,
    ViewChild,
    ElementRef,
    AfterViewInit,
    Inject,
} from '@angular/core';
import { WidgetService } from '../../services/widget.service';
import {
    GridsterConfig,
    GridsterItem,
    GridType,
    GridsterItemComponentInterface,
    GridsterItemComponent,
    GridsterComponent,
} from 'angular-gridster2';
import { WorkflowService } from '../../services/widgets/workflow.service';
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
import { IModules, IScenarios } from './workflow-list/workflow-list.component';
import { disableDebugTools } from '@angular/platform-browser';

declare let LeaderLine: any;

export interface IActions {
    actionUrl: string;
    description: string;
    name: 'CheckWarning' | 'SendEmail';
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

@Component({
    selector: 'evj-workflow',
    templateUrl: './workflow.component.html',
    styleUrls: ['./workflow.component.scss'],
    providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } }],
})
export class WorkflowComponent extends WidgetPlatform implements OnInit, OnDestroy, AfterViewInit {
    public options: GridsterConfig;
    public items: IGridsterItemLocal[] = [];

    public ColWidth: number = 1;
    public RowHeight: number = 1;

    private itemCol: number = 3;
    private itemRow: number = 3;

    widthSvgIconGrid: 50;
    heightSvgIconGrid: 50;

    chooseModules: IModules;
    chooseScenarios: IScenarios;

    tableAction: IActionTable[] = [];
    tableActionProp: IActionTableProp[] = [];
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

    actions: IActions[];

    availbleActions: IActionsScenario;
    activeActions: IGridsterItemLocal;

    isLoading: boolean = false;

    dragItem: 'SendEmail' | 'CheckWarning' | 'CheckExpired';

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
            gridSizeChangedCallback: this.resizeGridsterElement.bind(this),
            // itemValidateCallback: this.valid.bind(this),
            pushItems: false,
            minCols: 15,
            maxCols: 100,
            minRows: 15,
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
                // start: this.startDrag.bind(this),
                // stop: this.stopDrag.bind(this),
                dropOverItems: true,
                dropOverItemsCallback: this.stop1Drag.bind(this),
            },
            swap: false,
        };
    }

    stop1Drag(sourceItem: IGridsterItemLocal, targetItem: IGridsterItemLocal, grid) {
        console.log(sourceItem, targetItem, grid);
        // this.isLoading = true;
        if (targetItem.scenarioAction !== sourceItem?.nextScenarioAction) {
            // const arr = this.items;
            // const idxTarget = arr.findIndex(
            //     (val) => val.scenarioAction === targetItem.scenarioAction
            // );
            // const idxSource = arr.findIndex(
            //     (val) => sourceItem.scenarioAction === val.scenarioAction
            // );
            // if (!targetItem?.previousScenarioAction) {
            //     console.log('1');
            //     if (idxTarget >= 0) {
            //         arr.splice(idxSource, 1);
            //         const idTar = arr.findIndex(
            //             (val) => val.scenarioAction === targetItem.scenarioAction
            //         );
            //         sourceItem.nextScenarioAction = targetItem.scenarioAction;
            //         targetItem.previousScenarioAction = sourceItem.scenarioAction;
            //         if (idTar === 0) {
            //             arr.unshift(sourceItem);
            //             console.log(arr);
            //         } else {
            //             arr.splice(idTar, 0, sourceItem);
            //             console.log(arr);
            //         }
            //     }
            // } else if (targetItem.previousScenarioAction) {
            //     console.log('2');

            //     arr.splice(idxSource, 1);
            //     arr[idxTarget - 1].nextScenarioAction = sourceItem.scenarioAction;
            //     sourceItem.nextScenarioAction = targetItem.scenarioAction;
            //     targetItem['previousScenarioAction'] = sourceItem.scenarioAction;
            //     arr.splice(idxTarget - 1, 0, sourceItem);
            // } else if (sourceItem?.previousScenarioAction && !sourceItem?.nextScenarioAction) {
            //     console.log('3');
            //     arr.splice(idxTarget, 1);
            //     sourceItem.nextScenarioAction = targetItem.scenarioAction;
            //     targetItem.previousScenarioAction = sourceItem.scenarioAction;
            //     arr.splice(idxSource, 0, targetItem);
            // } else if (!targetItem?.previousScenarioAction && !targetItem?.nextScenarioAction) {
            //     console.log('4');
            //     arr.splice(idxTarget, 1);
            //     targetItem.previousScenarioAction = sourceItem.scenarioAction;
            //     sourceItem.nextScenarioAction = targetItem.scenarioAction;
            //     arr.splice(idxSource, 0, targetItem);
            // }
            // this.putConnect(sourceItem.scenarioAction, targetItem.scenarioAction, arr);
            this.putConnect(sourceItem.scenarioAction, targetItem.scenarioAction);

            // if (sourceItem.nextScenarioAction || targetItem.previousScenarioAction) {
            //     console.log('Вы точно хотите разрушить связь');
            //     const arr = this.items;
            //     const idxSource = arr.findIndex(
            //         (val) => val.scenarioAction === sourceItem.scenarioAction
            //     );
            //     const idxTarget = arr.findIndex(
            //         (val) => val.scenarioAction === targetItem.scenarioAction
            //     );
            //     if (idxSource >= 0) {
            //         if (arr[idxSource + 1].previousScenarioAction) {
            //             arr[idxSource + 1].previousScenarioAction = targetItem.scenarioAction;
            //         }
            //         arr.splice(idxSource, 0, targetItem);
            //     }
            // }
        }
    }

    ngOnInit(): void {
        super.widgetInit();
        this.workflowService.chooseModules$.subscribe((module) => {
            this.chooseModules = module;
        });
        this.workflowService.chooseScenario$.subscribe((scenario) => {
            this.resetScenario();
            this.chooseScenarios = scenario;
            if (this.chooseScenarios) {
                this.isLoading = true;
                this.loadActions(this.chooseModules.uid);
            } else {
                if (this.leaderLine.length > 0) {
                    this.leaderLine.forEach((value) => {
                        value.setInterval = 0;
                        clearInterval(value.setInterval);
                        value.remove();
                    });
                }
                this.items = [];
                this.leaderLine = [];
            }
        });
    }

    ngAfterViewInit(): void {
        this.slider();
        this.sliderLeftBar();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.leaderLine = [];
    }

    protected dataHandler(ref: any): void {
        if (ref) {
            // this.data = ref;
        }
    }

    resetScenario(): void {
        this.emailPropActionUI = {
            emailSubject: '',
            emailTo: new FormControl(''),
            emailToArray: [],
            emailCopy: new FormControl(''),
            emailCopyArray: [],
            emailBody: '',
        };
        this.tableAction = [];
        this.tableActionProp = [];
        this.emailAction = [];
        this.emailPropAction = [];
        this.activeActions = null;
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
            const a = e.screenY - y - 125;
            if (a < 50) {
                this.renderer.setStyle(this.splitTop.nativeElement, 'height', `${50}px`);
            } else {
                if (a > this.containerWorkflow.nativeElement.getBoundingClientRect().height - 65) {
                    const height = this.containerWorkflow.nativeElement.getBoundingClientRect()
                        .height;
                    const sum = height - 65;
                    this.renderer.setStyle(this.splitTop.nativeElement, 'height', `${sum}px`);
                } else {
                    this.renderer.setStyle(this.splitTop.nativeElement, 'height', `${a}px`);
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
        this.splitVertivalBar.nativeElement.addEventListener('mousedown', (e) => {
            mouseIsDown = true;
        });

        document.addEventListener('mousemove', (e) => {
            if (!mouseIsDown) {
                return;
            }

            // const a = e.x;
            // this.renderer.setStyle(this.splitLeft.nativeElement, 'min-width', `${a}px`);

            const x = this.splitLeft.nativeElement.getBoundingClientRect().x;
            console.log(x);

            const sum = e.x - x;
            if (sum < 150) {
                this.renderer.setStyle(this.splitLeft.nativeElement, 'width', `${0}px`);
                this.renderer.setStyle(this.splitLeft.nativeElement, 'min-width', `${0}px`);
            } else {
                this.renderer.setStyle(this.splitLeft.nativeElement, 'width', `${sum}px`);
            }
        });

        document.addEventListener('mouseup', () => {
            mouseIsDown = false;
            // this.resizeGridsterElement();
        });
    }

    // #endregion

    // #region LOAD

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
            this.availbleActions = await this.workflowService.getWorkfkowAvailbleActions(
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
        this.availbleActions.data.sortedActionList.forEach((sort) => {
            this.items.push({
                x,
                y: 3,
                cols: this.itemCol,
                rows: this.itemRow,
                type: sort.actionName,
                action: sort.action,
                actionName: sort.actionName,
                scenarioAction: sort.scenarioAction,
                previousScenarioAction: sort.previousScenarioAction,
                nextScenarioAction: sort.nextScenarioAction,
            });
            x += 4;
        });
        this.availbleActions.data.withoutLinks.forEach((sort) => {
            this.items.push({
                x,
                y: 3,
                cols: this.itemCol,
                rows: this.itemRow,
                type: sort.actionName,
                action: sort.action,
                actionName: sort.actionName,
                scenarioAction: sort.scenarioAction,
                previousScenarioAction: sort.previousScenarioAction,
                nextScenarioAction: sort.nextScenarioAction,
            });
            x += 4;
        });
        this.drawLeaderLine();
    }

    drawLeaderLine(): void {
        if (this.leaderLine.length > 0) {
            this.leaderLine.forEach((value) => {
                clearInterval(value.setInterval);
                value.remove();
            });
        }
        this.leaderLine = [];
        this.items.forEach((item) => {
            if (item?.scenarioAction && item?.nextScenarioAction) {
                setTimeout(() => {
                    this.leaderLine.push(
                        new LeaderLine(
                            document.getElementById(item.scenarioAction),
                            document.getElementById(item.nextScenarioAction),
                            {
                                size: 2,
                                color: 'white',
                            }
                        )
                    );
                    this.leaderLine.forEach((value) => {
                        value.setInterval = setInterval(() => {
                            if (value?.options) {
                                console.log(value);
                                value.position();
                            }
                        }, 100);
                    });
                }, 100);
            }
        });
    }

    putConnect(previousScenarioAction: string, id: string): void {
        const body: ICreateConnection = {
            scenario: {
                name: this.chooseScenarios.name,
            },
            actions: [
                // ...arr,
                {
                    scenarioAction: previousScenarioAction,
                    nextScenarioAction: id,
                },
                {
                    scenarioAction: id,
                    previousScenarioAction,
                },
            ],
        };

        const windowsParam: IAlertWindowModel = {
            isShow: true,
            questionText: 'Вы уверены, что хотите сделать связь?',
            acceptText: 'Да',
            cancelText: 'Нет',
            acceptFunction: async () => {
                this.alertWindow = null;
                try {
                    await this.createСonnection(body);
                    await this.loadWorkfkowAvailbleActions();
                    this.resetScenario();
                } catch (error) {}
            },
            closeFunction: () => {},
            cancelFunction: () => {
                this.alertWindow = null;
            },
        };
        this.alertWindow = windowsParam;
    }

    async createСonnection(body: ICreateConnection): Promise<void> {
        try {
            this.isLoading = true;
            await this.workflowService.putActionsConnections(
                this.chooseModules.uid,
                this.chooseScenarios.uid,
                body
            );
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
            console.error(error);
        }
    }

    // #endregion

    // #region GRIDSTER

    private initGridster() {}

    public sizeGrid(): void {
        const widthScreen = document.getElementById('gridSize').clientWidth;
        const heigthScreen = document.getElementById('gridSize').clientHeight;
        const widthScreen1 = document.getElementById('gridSize').getBoundingClientRect();
        // console.log(widthScreen1);

        const widthScreenDefault = 300;
        const heigthScreenDefault = 300;
        // this.ColWidth *= (widthScreen - 660) / (widthScreenDefault - 660);
        // this.RowHeight *= (heigthScreen - 329) / (heigthScreenDefault - 329);

        this.options.fixedColWidth = this.ColWidth;
        this.options.fixedRowHeight = this.RowHeight;

        this.changedOptions();
    }

    public onResize(): void {
        this.sizeGrid();
        this.resizeGridsterElement();
    }

    public resizeGridsterElement(): void {
        setTimeout(() => {
            this.changedOptions();
        }, 1000);
        // this.items.setSize();
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
            const el = this.actions.find((val) => val.name === this.dragItem);
            try {
                const newAction = await this.workflowService.postAddActionsInScenario(
                    this.chooseModules.uid,
                    this.chooseScenarios.uid,
                    el?.uid
                );
                item.cols = this.itemCol;
                item.rows = this.itemRow;
                item.type = this.dragItem;
                item.scenarioAction = newAction.uid;
                item.action = newAction.actionUid;

                this.items.push(item);
                this.snackBar.openSnackBar('Действие добавлено в сценарий');
            } catch (error) {}
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
                    await this.workflowService.deleteActionsScenario(
                        this.chooseModules.uid,
                        this.chooseScenarios.uid,
                        scenarioAction
                    );
                    const idx = this.items.findIndex(
                        (val) => val.scenarioAction === scenarioAction
                    );
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
            this.resetScenario();
        } else {
            if (this.activeActions !== item) {
                if (this.activeActions) {
                    const previousScenarioAction: string = this.activeActions.scenarioAction;
                    const id: string = item.scenarioAction;
                    // this.putConnect(previousScenarioAction, id);
                    await this.getScenarioActionProp(id);
                    this.getActionProp(item.action);
                    this.activeActions = item;
                } else {
                    await this.getScenarioActionProp(item.scenarioAction);
                    this.getActionProp(item.action);
                    this.activeActions = item;
                }
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
                this.tableActionProp = ans;
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
            const ans = await this.workflowService.getActionProperties(
                this.chooseModules.uid,
                actionId
            );
            const el = ans.find((val) => val.name === 'EmailSubject');
            this.emailAction = [];
            this.tableAction = [];
            if (el) {
                this.emailAction = ans;
            } else {
                this.tableAction = ans;
                this.tableAction.forEach((val) => {
                    const el = this.tableActionProp.find((value) => value.propertyGuid === val.uid);
                    if (!el) {
                        this.tableActionProp.push({
                            value: '',
                            propertyName: val.name,
                            propertyGuid: val.uid,
                        });
                        console.log(this.tableActionProp);
                    }
                });
            }
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
        }
    }

    // #region  Chips

    selected(event: MatAutocompleteSelectedEvent): void {
        // this.valuesInputChipsTo.push(event.option.viewValue);
        // this.valueInputChips.nativeElement.value = '';
        // this.valueCtrl.setValue(null);
    }

    add(event: MatChipInputEvent, type: 'to' | 'copy'): void {
        const input = event.input;
        const value = event.value;

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
            this.snackBar.openSnackBar('Некорректно введен email', 'snackbar-red');
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
        console.log(this.content?.nativeElement?.getBoundingClientRect());

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

    onEmailText(event): void {
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
        if (this.tableAction.length > 0) {
            this.isLoading = true;
            this.tableActionProp.forEach(async (value) => {
                const body = { value: value.value };
                try {
                    await this.workflowService.putProps(
                        this.chooseScenarios.uid,
                        this.activeActions.scenarioAction,
                        value.propertyGuid,
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
}
