import { Injectable } from '@angular/core';
import { IOzsmLineDiagramResponse, IOzsmLineDiagramType } from '../../../models/OZSM/ozsm-line-diagram.model';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { tryCatch } from 'rxjs/internal-compatibility';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IOzsmScenarioResponse } from '../../../models/OZSM/ozsm-scenarios.model';
import { IOzsmCirclePlanningDiagramResponse } from '../../../models/OZSM/ozsm-circle-planning-diagram.model';
import { IOzsmResourcesCircleDiagram } from '../../../models/OZSM/ozsm-resources-circle-diagram.model';
import { IOzsmStorageStatsResponse } from '../../../models/OZSM/ozsm-shared.model';
import { IOzsmPlanningMainItemResponse } from '../../../models/OZSM/ozsm-planning-main.model';

@Injectable({
    providedIn: 'root',
})
export class OzsmService {
    private readonly restUrl: string;

    public scenarioId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public scenarioIdFilter$: Observable<string> = this.scenarioId$.asObservable().pipe(filter((x) => !!x));
    public lineDiagrams$: BehaviorSubject<IOzsmLineDiagramResponse[]> = new BehaviorSubject<IOzsmLineDiagramResponse[]>(
        []
    );

    constructor(private http: HttpClient, private appConfigService: AppConfigService) {
        this.restUrl = this.appConfigService.ozsmUrl;
    }

    public async getScenarios(): Promise<IOzsmScenarioResponse[]> {
        try {
            return (
                (
                    await this.http
                        .get<{ scenarioInfo: IOzsmScenarioResponse[] }>(`${this.restUrl}/api/Ozsm/ScenarioInfo`)
                        .toPromise()
                )?.scenarioInfo ?? []
            );
        } catch (e) {
            return [];
        }
    }

    public async getLineDiagrams(scenarioId: string, type: IOzsmLineDiagramType): Promise<IOzsmLineDiagramResponse> {
        try {
            const res = await this.http
                .get<IOzsmLineDiagramResponse>(`${this.restUrl}/api/Ozsm/${scenarioId}/${type}`)
                .toPromise();
            res.type = type;
            return res;
        } catch (e) {
            console.error(e);
            return {
                scenarioID: scenarioId,
                type,
                supplyData: [],
            };
        }
    }

    public async getPlanningDiagram(scenarioId: string): Promise<IOzsmCirclePlanningDiagramResponse> {
        try {
            return (
                await this.http
                    .get<{ planSummary: IOzsmCirclePlanningDiagramResponse }>(
                        `${this.restUrl}/api/Ozsm/${scenarioId}/PlanSummaries`
                    )
                    .toPromise()
            )?.planSummary;
        } catch (e) {
            return null;
        }
    }

    public async getResourcesDiagram(scenarioId: string): Promise<IOzsmResourcesCircleDiagram[]> {
        try {
            return (
                (
                    await this.http
                        .get<{ utilityUsing: IOzsmResourcesCircleDiagram[] }>(
                            `${this.restUrl}/api/Ozsm/${scenarioId}/UtilityUsing`
                        )
                        .toPromise()
                )?.utilityUsing ?? []
            );
        } catch (e) {
            return [];
        }
    }

    public async getStorageStats(scenarioId: string): Promise<IOzsmStorageStatsResponse> {
        try {
            return await this.http
                .get<IOzsmStorageStatsResponse>(`${this.restUrl}/api/Ozsm/${scenarioId}/StorageStats`)
                .toPromise();
        } catch (e) {
            return null;
        }
    }

    public async getProductionAllocation(scenarioId: string): Promise<IOzsmPlanningMainItemResponse[]> {
        try {
            return (
                (
                    await this.http
                        .get<{ unitsSupplyAllocation: IOzsmPlanningMainItemResponse[] }>(
                            `${this.restUrl}/api/Ozsm/${scenarioId}/ProductionAllocations`
                        )
                        .toPromise()
                )?.unitsSupplyAllocation ?? []
            );
        } catch (e) {
            return [];
        }
    }
}
