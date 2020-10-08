import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDatesInterval, WidgetService } from '../widget.service';
import { AppConfigService } from '@core/service/app-config.service';
import { IOilOperationTransfer } from '../../models/oil-operations';

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

export interface IOilOperationsOptions {
    dates?: { startTime: Date; endTime: Date };
    product?: string;
    group?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OilOperationsService {

    private readonly restUrl: string;

    private readonly BATCH_SIZE: number = 50;

    constructor(
        private configService: AppConfigService,
        private widgetService: WidgetService,
        private http: HttpClient,
    ) {
        this.restUrl = configService.restUrl;
    }

    public async getTransferList(
        lastId: number,
        options: IOilOperationsOptions
    ): Promise<IOilOperationTransfer[]> {
        try {
            return this.http
                .get<IOilOperationTransfer[]>(
                    this.restUrl +
                    `/api/oil-control/transfers?${this.getOptionString(lastId, options)}`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    public async getShipmentList(dates: IDatesInterval): Promise<IOilShipmentRest[]> {
        const query = this.getFilterString(dates.fromDateTime, dates.toDateTime);
        return await this.getShipmentListRequest(query);
    }

    public async getFilterList<T>(filter: 'products' | 'groups'): Promise<T>  {
        try {
            return await this.http.get<T>(`${this.restUrl}/api/oil-control/${filter}`).toPromise();
        } catch (e) {
            console.error(e);
            return null;
        }
    }

    public async getOperations<T>(filter: 'products' | 'groups'): Promise<T>  {
        try {
            return await this.http.get<T>(`${this.restUrl}/api/oil-control/${filter}`).toPromise();
        } catch (e) {
            console.error(e);
            return null;
        }
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

    private async getShipmentListRequest(query: string): Promise<IOilShipmentRest[]> {
        return this.http
            // .get<IOilShipmentRest[]>(`${this.restUrl}/api/oil-control/shipment${query}`)
            .get<IOilShipmentRest[]>(`assets/mock/OilOperationsMock/shipments.json`)
            .toPromise();
    }

    private getOptionString(lastId: number, options: IOilOperationsOptions): string {
        let res = `take=${this.BATCH_SIZE}&lastId=${lastId}&`;
        if (options.dates) {
            res +=
                `startTime=${options.dates?.startTime.toISOString()}&` +
                `endTime=${options.dates?.endTime.toISOString()}`;
        }
        if (options.group) {
            res += `&group=${options.group}`;
        }
        if (options.product) {
            res += `&product=${options.product}`;
        }
        return res;
    }
}
