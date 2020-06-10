import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDatesInterval, WidgetService } from '../widget.service';
import { AppConfigService } from '../../../services/appConfigService';

interface IOilOperationTransferRest {
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

interface IOilShipmentRest {
    id: number;
    direction: string;
    tank: {
        id: string;
        omsUid: string;
        afUid: string;
        name: string;
        enabled: boolean;
        limitHours: number;
        deletedAt: Date;
    };
    documentNumber: number;
    mass: number;
    passport: {
        id: number;
        name: string;
        fileUid: string;
    },
    shipped: string;
    note: string;
    document: string;
    dateFinish: Date;
    productName: string;
    resName: string;
    passportNum: string;
    productID: number;
    massDelta: number;
    transfer_ID: number;
    carNumber: string;
    trailerNumber: string;
    dateStart: Date;
    dateEnd: Date;
    iD_Object: number;
    massBegin: number;
    massEnd: number;
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

    public async getTransferList(dates: IDatesInterval, group: string = null, product: string = null): Promise<IOilOperationTransferRest[]> {
        const query = this.getFilterString(dates.fromDateTime, dates.toDateTime, group, product);
        return await this.getTransferListRequest(query);
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
            `?startTime=${startTime.toISOString()}` +
            `&endTime=${endTime.toISOString()}`;
        if (group) {
            requestQuery += `&group=${group}`;
        }
        if (product) {
            requestQuery += `&product=${product}`;
        }
        return requestQuery;
    }

    private async getTransferListRequest(query: string): Promise<IOilOperationTransferRest[]> {
        return this.http
            // .get<IOilOperationTransferRest[]>(`${this.restUrl}/api/oil-control/transfer${query}`)
            .get<IOilOperationTransferRest[]>(`assets/mock/OilOperationsMock/transfers.json`)
            .toPromise();
    }
}
