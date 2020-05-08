import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '../../../services/appConfigService';
import { IFolderReport } from '../../components/report/reports.component';
import { IModules, IScenarios, IActions, IAvailableActions } from '../../widgets/workflow/workflow.component';

@Injectable({
    providedIn: 'root',
})
export class WorkflowService {

    private readonly restUrl: string;

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
            .get<IScenarios[]>(this.restUrl +
                `/api/workflow-constructor/modules/${moduleId}/scenarios`)
            .toPromise();
    }

    async getWorkfkowActions(moduleId: string): Promise<IActions[]> {
        return await this.http
            .get<IActions[]>(this.restUrl +
                `/api/workflow-constructor/modules/${moduleId}/actions`)
            .toPromise();
    }

    async getWorkfkowAvailbleActions(
        moduleId: string, scenarioId: string): Promise<IAvailableActions[]> {
        return await this.http
            .get<IAvailableActions[]>(this.restUrl +
                `/api/workflow-constructor/modules/${moduleId}/scenarios/${scenarioId}/actions`)
            .toPromise();
    }

    async getWorkfkowPropActions(moduleId: string, actionId: string): Promise<IActions[]> {
        return await this.http
            .get<IActions[]>(this.restUrl +
                `/api/workflow-constructor/modules/${moduleId}/actions/${actionId}/properties`)
            .toPromise();
    }

    async postScenarios(moduleId: string, body): Promise<void> {
        return this.http
            .post<void>(this.restUrl +
                `/api/workflow-constructor/modules/${moduleId}/scenarios`, body)
            .toPromise();
    }

    async postAddActionsInScenario(
        moduleId: string, scenarioId: string, actionId: string): Promise<void> {
        return this.http
            .post<void>(this.restUrl +
                `/api/workflow-constructor/modules/${moduleId}
                /scenarios/${scenarioId}/actions/${actionId}`, null)
            .toPromise();
    }

    public async putActionsConnections(moduleId: string, scenarioId: string, body): Promise<any> {
        return await this.http.put<any[]>(this.restUrl +
            `/api/workflow-constructor/modules/${moduleId}
        /scenarios/${scenarioId}`, body).toPromise();
    }

    public async deleteCustomOptions(id: number): Promise<any> {
        return await this.http.delete<any[]>(this.restUrl + '/api/report-options/custom/' + id);
    }

}
