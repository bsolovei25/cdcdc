import { Component, OnInit, OnDestroy } from '@angular/core';
import { IAlertWindowModel } from '../../../../@shared/models/alert-window.model';
import { WorkflowService } from 'src/app/dashboard/services/widgets/admin-panel/workflow.service';
import { SnackBarService } from 'src/app/dashboard/services/snack-bar.service';
import { MatSelectChange } from '@angular/material/select';
import { ICreateConnection } from '../workflow.component';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

export interface IModules {
    createdAt: Date;
    name: string;
    uid: string;
    description: string;
}

export interface IScenarios {
    createdAt: Date;
    name: string;
    status: 'stopped' | 'active';
    uid: string;
    wfSystemUid: string;
    errorMessage?: string;
}

@Component({
    selector: 'evj-workflow-list',
    templateUrl: './workflow-list.component.html',
    styleUrls: ['./workflow-list.component.scss'],
})
export class WorkflowListComponent implements OnInit, OnDestroy {
    isLoading: boolean = true;

    private subscriptions: Subscription[] = [];

    public alertWindow: IAlertWindowModel;

    modules: IModules[];
    chooseModules: IModules;

    scenarios: IScenarios[];
    chooseScenarios: IScenarios;

    public inputControl: FormControl = new FormControl('');

    constructor(private workflowService: WorkflowService, private snackBar: SnackBarService) {}

    ngOnInit(): void {
        this.loadItem();
        this.subscriptions.push(
            this.workflowService.chooseModules$.subscribe((module) => {
                this.chooseModules = module;
                this.workflowService.chooseScenario$.next(null);
                if (module) {
                    this.loadScenarios(this.chooseModules.uid);
                }
            })
        );
        this.subscriptions.push(
            this.workflowService.chooseScenario$.subscribe((scenario) => {
                this.chooseScenarios = scenario;
            })
        );
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach((subscription) => {
            subscription.unsubscribe();
        });
    }

    private async loadItem(): Promise<void> {
        this.isLoading = true;
        const dataLoadQueue: Promise<void>[] = [];
        dataLoadQueue.push(
            this.workflowService.getWorkfkowModules().then((data) => {
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

    async postScenarios(): Promise<void> {
        this.inputControl.setValue(null);
        this.alertWindow = {
            isShow: true,
            questionText: 'Создание нового сценария',
            acceptText: 'Добавить',
            cancelText: 'Отмена',
            input: {
                formControl: this.inputControl,
                placeholder: 'Введите название',
            },
            acceptFunction: async (): Promise<void> => {
                this.alertWindow = null;
                this.isLoading = true;
                try {
                    this.isLoading = true;
                    const ans = await this.workflowService.postScenarios(this.chooseModules.uid, {
                        name: this.inputControl.value,
                    });
                    this.scenarios.push(ans);
                    this.snackBar.openSnackBar(`Сценарий ${ans.name} добавлен`);
                    this.isLoading = false;
                } catch (error) {
                    this.isLoading = false;
                }
            },
            cancelFunction: (): void => {
                this.alertWindow = null;
            },
        };
    }

    chooseScen(scen: IScenarios): void {
        this.workflowService.chooseScenario$.next(this.chooseScenarios === scen ? null : scen);
    }

    async editScenario(event: MouseEvent, scen: IScenarios): Promise<void> {
        event.stopPropagation();
        this.inputControl.setValue(scen.name);
        this.alertWindow = {
            isShow: true,
            questionText: 'Изменение имени сценария',
            acceptText: 'Изменить',
            cancelText: 'Отмена',
            input: {
                formControl: this.inputControl,
                placeholder: 'Введите название',
            },
            acceptFunction: async (): Promise<void> => {
                const name = this.inputControl.value;
                this.alertWindow = null;
                this.isLoading = true;
                try {
                    this.isLoading = true;
                    const body: ICreateConnection = {
                        scenario: {
                            name: scen.name,
                        },
                        actions: [],
                    };
                    await this.createСonnection(body);
                    scen.name = name;
                    this.snackBar.openSnackBar(`Сценарий ${name} переименован`);
                    this.isLoading = false;
                } catch (error) {
                    this.isLoading = false;
                }
            },
            cancelFunction: () => {
                this.alertWindow = null;
            },
        };
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

    async deleteScenario(event: MouseEvent, scenarioId: string): Promise<void> {
        event.stopPropagation();
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
                    const idx = this.scenarios.findIndex((val) => val.uid === scenarioId);
                    if (idx >= 0) {
                        this.scenarios.splice(idx, 1);
                    }
                    this.chooseScenarios = null;
                    this.isLoading = false;
                    this.snackBar.openSnackBar('Сценарий удален');
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

    startStopScenario(event: MouseEvent, scenario: IScenarios): void {
        event.stopPropagation();
        if (scenario.status === 'stopped') {
            this.startScenario(scenario.uid);
        } else {
            this.stopScenario(scenario.uid);
        }
    }

    async startScenario(scenarioId: string): Promise<void> {
        try {
            this.isLoading = true;
            await this.workflowService.putScenarioStart(this.chooseModules.uid, scenarioId);
            await this.loadScenarios(this.chooseModules.uid);
            this.snackBar.openSnackBar('Сценарий запущен');
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
        }
    }

    async stopScenario(scenarioId: string): Promise<void> {
        try {
            this.isLoading = true;
            await this.workflowService.putScenarioStop(this.chooseModules.uid, scenarioId);
            await this.loadScenarios(this.chooseModules.uid);
            this.snackBar.openSnackBar('Сценарий остановлен');
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
        }
    }

    async chooseSystem(item: MatSelectChange): Promise<void> {
        this.isLoading = true;
        this.workflowService.chooseModules$.next(item.value);
    }

    private async loadScenarios(idModule: string): Promise<void> {
        try {
            this.isLoading = true;
            this.scenarios = await this.workflowService.getWorkfkowScenarios(idModule);
            this.isLoading = false;
        } catch (error) {
            this.isLoading = false;
        }
    }
}
