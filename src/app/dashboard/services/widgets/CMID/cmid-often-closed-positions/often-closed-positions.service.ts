import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { AppConfigService } from "@core/service/app-config.service";
import { ICmidOftenClosedPosition } from "@widgets/CMID/cmid-often-closed-positions/cmid-often-closed-positions.interfaces";

@Injectable({
    providedIn: 'root',
})
export class OftenClosedPositionsService {
    private restUrl: string;

    // Mock
    public positionsList = [
        {
            name: 'K_DBL_QI9077',
            plant: 'АВТ-10',
            closeCount: 15
        },
        {
            name: '11-FIC3054',
            plant: 'BC-04',
            closeCount: 14
        },
        {
            name: 'K_DBL_TIRSA1732',
            plant: 'Изомалк-2',
            closeCount: 14
        },
        {
            name: 'K_DBL_TI1708',
            plant: 'КТ-1',
            closeCount: 12
        },
        {
            name: 'K_DBL_QI1294',
            plant: 'ГФУ-2',
            closeCount: 12
        },
        {
            name: 'K_DBL_QI9077',
            plant: 'АВТ-10',
            closeCount: 15
        },
        {
            name: '11-FIC3054',
            plant: 'BC-04',
            closeCount: 14
        },
        {
            name: 'K_DBL_TIRSA1732',
            plant: 'Изомалк-2',
            closeCount: 14
        },
        {
            name: 'K_DBL_TI1708',
            plant: 'КТ-1',
            closeCount: 12
        },
        {
            name: 'K_DBL_QI1294',
            plant: 'ГФУ-2',
            closeCount: 12
        },
        {
            name: 'K_DBL_QI9077',
            plant: 'АВТ-10',
            closeCount: 15
        },
        {
            name: '11-FIC3054',
            plant: 'BC-04',
            closeCount: 14
        },
        {
            name: 'K_DBL_TIRSA1732',
            plant: 'Изомалк-2',
            closeCount: 14
        },
        {
            name: 'K_DBL_TI1708',
            plant: 'КТ-1',
            closeCount: 12
        },
        {
            name: 'K_DBL_QI1294',
            plant: 'ГФУ-2',
            closeCount: 12
        },
        {
            name: 'K_DBL_QI9077',
            plant: 'АВТ-10',
            closeCount: 15
        },
        {
            name: '11-FIC3054',
            plant: 'BC-04',
            closeCount: 14
        },
        {
            name: 'K_DBL_TIRSA1732',
            plant: 'Изомалк-2',
            closeCount: 14
        },
        {
            name: 'K_DBL_TI1708',
            plant: 'КТ-1',
            closeCount: 12
        },
        {
            name: 'K_DBL_QI1294',
            plant: 'ГФУ-2',
            closeCount: 12
        }
    ];

    constructor(private http: HttpClient, configService: AppConfigService) {
        this.restUrl = configService.restUrl;
    }

    public async getPositionsList(widgetId: string): Promise<ICmidOftenClosedPosition[]> {
        // return this.http.get<IOftenClosedPosition[]>(`${this.restUrl}/api/../../../${widgetId}`).toPromise();
        return null;
    }
}
