import { Injectable } from '@angular/core';
import {
    IOzsmLineDiagramResponse,
    IOzsmLineDiagramType,
} from '../../../models/OZSM/ozsm-line-diagram.model';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from '@core/service/app-config.service';
import { tryCatch } from 'rxjs/internal-compatibility';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { IOzsmScenarioResponse } from '../../../models/OZSM/ozsm-scenarios.model';
import { IOzsmCirclePlanningDiagramResponse } from '../../../models/OZSM/ozsm-circle-planning-diagram.model';
import { IOzsmResourcesCircleDiagram } from '../../../models/OZSM/ozsm-resources-circle-diagram.model';

@Injectable({
    providedIn: 'root',
})
export class OzsmService {
    private readonly restUrl: string;

    public scenarioId$: BehaviorSubject<string> = new BehaviorSubject<string>(null);
    public lineDiagrams$: BehaviorSubject<IOzsmLineDiagramResponse[]> = new BehaviorSubject<
        IOzsmLineDiagramResponse[]
    >([]);

    constructor(private http: HttpClient, private appConfigService: AppConfigService) {
        this.restUrl = this.appConfigService.restUrl;
        this.initialSubscriptions();
    }

    public async getScenarios(): Promise<IOzsmScenarioResponse[]> {
        try {
            return await this.http
                .get<IOzsmScenarioResponse[]>(`${this.restUrl}/api/Ozsm/GetScenarioInfo`)
                .toPromise();
        } catch (e) {
            return [];
        }
    }

    public async getLineDiagrams(
        scenarioId: string,
        type: IOzsmLineDiagramType
    ): Promise<IOzsmLineDiagramResponse> {
        try {
            const res = await this.http
                .get<IOzsmLineDiagramResponse>(`${this.restUrl}`)
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

    public async getPlanningDiagram(
        scenarioId: string
    ): Promise<IOzsmCirclePlanningDiagramResponse> {
        try {
            return await this.http
                .get<IOzsmCirclePlanningDiagramResponse>(`${this.restUrl}`)
                .toPromise();
        } catch (e) {
            return null;
        }
    }

    public async getResourcesDiagram(scenarioId: string): Promise<IOzsmResourcesCircleDiagram[]> {
        try {
            return await this.http
                .get<IOzsmResourcesCircleDiagram[]>(`${this.restUrl}`)
                .toPromise();
        } catch (e) {
            return null;
        }
    }

    private async changeScenarioId(scenarioId: string): Promise<void> {
        const types: IOzsmLineDiagramType[] = [
            'blendProducts',
            'packedProducts',
            'componentSupply',
            'crudeSupply',
        ];
        const result: IOzsmLineDiagramResponse[] = [];
        const loadQueue: Promise<void>[] = [];
        types.forEach((x) =>
            loadQueue.push(
                this.getLineDiagrams(scenarioId, x).then((res) => result.push(res)) as Promise<void>
            )
        );
        await Promise.all(loadQueue);
        console.log(result);
        this.lineDiagrams$.next(result);
    }

    private initialSubscriptions(): void {
        this.scenarioId$.pipe(filter((x) => !!x)).subscribe(this.changeScenarioId.bind(this));
    }
}
