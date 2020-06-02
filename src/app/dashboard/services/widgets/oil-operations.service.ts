import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDatesInterval, WidgetService } from '../widget.service';
import { AppConfigService } from '../../../services/appConfigService';
import { Interface } from 'readline';

interface IOilOperationTransfer {
    id: number;
    tank: {
        id: string,
        omsUid: string,
        afUid: string,
        name: string,
        enabled: boolean,
        limitHours: number,
        deletedAt: Date
    };
    product: string;
    passport: {
        id: number;
        fileUid: string;
    };
    startTime: Date;
    endTime: Date;
    mass: number;
    deviation: number;
    status: string; // TODO status
    published: boolean;
    omsTransferUid: string;
    deletedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class OilOperationsService {

    private readonly restUrl: string;

    constructor(
        private configService: AppConfigService,
        private widgetService: WidgetService,
        private http: HttpClient,
    ) {
        this.restUrl = configService.restUrl;
    }

    public async getTransferList(dates: IDatesInterval, group: string = null, product: string = null): Promise<any> {
        const query = this.getFilterString(dates.fromDateTime, dates.toDateTime, group, product);

    }

    private getFilterString(
        startTime: Date,
        endTime: Date,
        group: string = null,
        product: string = null,
    ): string {
        if (!startTime || !endTime) {
            return null;
        }
        let requestQuery: string =
            `?startTime=${startTime}` +
            `&endTime=${endTime}`;
        if (group) {
            requestQuery += `&group=${group}`;
        }
        if (product) {
            requestQuery += `&product=${product}`;
        }
        return requestQuery;
    }

    private async getTransferListRequest(query: string): Promise<any> {
        return;
    }
}
