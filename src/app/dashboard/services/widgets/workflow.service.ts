import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { IFolderReport } from '../../components/report/reports.component';
import {
    IActions,
    IActionsScenario,
    IActionEmail,
    IActionTable,
    IActionEmailProps,
} from '../../widgets/workflow/workflow.component';
import { BehaviorSubject } from 'rxjs';
import { IModules, IScenarios } from '../../widgets/workflow/workflow-list/workflow-list.component';

@Injectable({
    providedIn: 'root',
})
export class WorkflowService {
    private readonly restUrl: string;

    chooseModules$: BehaviorSubject<IModules> = new BehaviorSubject<IModules>(null);
    chooseScenario$: BehaviorSubject<IScenarios> = new BehaviorSubject<IScenarios>(null);

    constructor(public http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    async getWorkfkowModules(): Promise<IModules[]> {
        return await this.http
            .get<IModules[]>(this.restUrl + '/api/workflow-constructor/modules')
            .toPromise();
    }

    async getWorkfkowScenarios(moduleId: string): Promise<IScenarios[]> {
        return await this.http
            .get<IScenarios[]>(
                this.restUrl + `/api/workflow-constructor/modules/${moduleId}/scenarios`
            )
            .toPromise();
    }

    async getWorkfkowActions(moduleId: string): Promise<IActions[]> {
        return await this.http
            .get<IActions[]>(this.restUrl + `/api/workflow-constructor/modules/${moduleId}/actions`)
            .toPromise();
    }

    async getWorkfkowAvailbleActions(
        moduleId: string,
        scenarioId: string
    ): Promise<IActionsScenario> {
        return await this.http
            .get<IActionsScenario>(
                this.restUrl +
                    `/api/workflow-constructor/modules/${moduleId}/scenarios/${scenarioId}/actions`
            )
            .toPromise();
    }

    async getWorkfkowPropActions(moduleId: string, actionId: string): Promise<IActions[]> {
        return await this.http
            .get<IActions[]>(
                this.restUrl +
                    `/api/workflow-constructor/modules/${moduleId}/actions/${actionId}/properties`
            )
            .toPromise();
    }

    // properties

    async getActionProperties(moduleId: string, actionId: string): Promise<any> {
        return await this.http
            .get<any>(
                this.restUrl +
                    `/api/workflow-constructor/modules/${moduleId}/actions/${actionId}/properties`
            )
            .toPromise();
    }

    async getScenarioActionProperties(scenarioId: string, actionId: string): Promise<any> {
        return await this.http
            .get<any>(
                this.restUrl +
                    `/api/workflow-constructor/scenario/${scenarioId}/actions/${actionId}/properties`
            )
            .toPromise();
    }

    public async putProps(
        scenarioId: string,
        actionId: string,
        propertyId: string,
        body: { value: string }
    ): Promise<any> {
        return await this.http
            .put<any[]>(
                this.restUrl +
                    `/api/workflow-constructor/scenario/${scenarioId}/actions/${actionId}/properties/${propertyId}`,
                body
            )
            .toPromise();
    }

    async postScenarios(moduleId: string, body): Promise<IScenarios> {
        return this.http
            .post<IScenarios>(
                this.restUrl + `/api/workflow-constructor/modules/${moduleId}/scenarios`,
                body
            )
            .toPromise();
    }

    async postAddActionsInScenario(
        moduleId: string,
        scenarioId: string,
        actionId: string
    ): Promise<any> {
        return this.http
            .post<any>(
                this.restUrl +
                    `/api/workflow-constructor/modules/${moduleId}/scenarios/${scenarioId}/actions/${actionId}`,
                null
            )
            .toPromise();
    }

    public async putActionsConnections(moduleId: string, scenarioId: string, body): Promise<any> {
        return await this.http
            .put<any[]>(
                this.restUrl +
                    `/api/workflow-constructor/modules/${moduleId}/scenarios/${scenarioId}`,
                body
            )
            .toPromise();
    }

    public async putScenarioStart(moduleId: string, scenarioId: string): Promise<any> {
        return await this.http
            .put<any[]>(
                this.restUrl +
                    `/api/workflow-constructor/modules/${moduleId}/scenarios/${scenarioId}/start`,
                null
            )
            .toPromise();
    }

    public async putScenarioStop(moduleId: string, scenarioId: string): Promise<any> {
        return await this.http
            .put<any[]>(
                this.restUrl +
                    `/api/workflow-constructor/modules/${moduleId}/scenarios/${scenarioId}/stop`,
                null
            )
            .toPromise();
    }

    // delete

    public async deleteActionsScenario(
        moduleId: string,
        scenarioId: string,
        scenarioAction: string
    ): Promise<any> {
        return await this.http
            .delete<any[]>(
                this.restUrl +
                    `/api/workflow-constructor/modules/${moduleId}/scenarios/${scenarioId}/actions/${scenarioAction}`
            )
            .toPromise();
    }

    public async deleteScenario(moduleId: string, scenarioId: string): Promise<any> {
        return await this.http
            .delete<any[]>(
                this.restUrl +
                    `/api/workflow-constructor/modules/${moduleId}/scenarios/${scenarioId}`
            )
            .toPromise();
    }
}
