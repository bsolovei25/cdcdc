import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDatesInterval, WidgetService } from '../widget.service';
import { AppConfigService } from '@core/service/app-config.service';
import { IOilTransfer } from '../../models/oil-operations';

/*export interface IOilShipmentRest {
    id: number;
    direction: string;
    tank: {
        id: string;
        omsUid: string;
        afUid: string;
        name: string;
        shortName: string;
        enabled: true;
        limitHours: number;
    };
    product: {
        id: number;
        name: string;
        shortName: string;
        fullName: string;
        sapCode: string;
        okpd2Code: string;
        gost: string;
        shippingComplexId: number;
        group?: {
            id: number;
            name: string;
            shortName: string;
            subGroupName: string;
        };
        groupId?: number;
    };
    documentNumber?: number;
    documentName?: string;
    sectionNumber: number;
    transferId: number;
    transferPrevId: number;
    shipmentType: {
        id: number;
        shipmentTypeName: string;
        errorSI: number;
        flagManual: boolean;
        measurerId: number;
        measurer?: any;
        transportTypeId: number;
        transportType: {
            id: number;
            name: string;
        };
        originalId: string;
        systemId: string;
    };
    shipmentTypeId: number;
    mass: number;
    massDelta: number;
    passport: {
        id: number;
        name: string;
        fileUid: string;
        tank: {
            id: string;
            omsUid: string;
            afUid: string;
            name: string;
            shortName: string;
            enabled: boolean;
            limitHours: number;
        };
        tankId: string;
        product: {
            id: number;
            name: string;
            shortName: string;
            fullName: string;
            sapCode: string;
            okpd2Code: string;
            gost: string;
            isActual: boolean;
            shippingComplexId: number;
            group: {
                id: number;
                name: string;
                shortName: string;
                subGroupName: string;
            };
            groupId: number;
        };
        productId: number;
        customId: number;
        date: Date;
    };
    isManualRelation: boolean;
    shipped: number;
    note: string;
    dateFinish: Date;
}*/

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
    ): Promise<IOilTransfer[]> {
        try {
            return this.http
                .get<IOilTransfer[]>(
                    this.restUrl +
                    `/api/oil-control/transfers?${this.getOptionString(lastId, options)}`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
        }
    }

    public async getShipments<T>(dates: IDatesInterval): Promise<T> {
        const query = this.getFilterString(dates.fromDateTime, dates.toDateTime);
        try {
            return await this.http.get<T>(`${this.restUrl}/api/oil-control/shipments/${query}`).toPromise();
        } catch (e) {
            console.error(e);
            return new Promise<T>(resolve => []);
        }
    }

    public async getShipmentsByTransferId<T>(transferId: number): Promise<T> {
        try {
            return await this.http.get<T>(`${this.restUrl}/api/oil-control/shipments/${transferId}/transfer`).toPromise();
        } catch (e) {
            console.error(e);
            return new Promise<T>(resolve => []);
        }
    }

    public async getFilterList<T>(filter: 'products' | 'groups'): Promise<T>  {
        try {
            return await this.http.get<T>(`${this.restUrl}/api/oil-control/${filter}`).toPromise();
        } catch (e) {
            console.error(e);
            return new Promise<T>(resolve => []);
        }
    }

    public async getOperations<T>(filter: 'products' | 'groups'): Promise<T>  {
        try {
            return await this.http.get<T>(`${this.restUrl}/api/oil-control/${filter}`).toPromise();
        } catch (e) {
            console.error(e);
            return new Promise<T>(resolve => []);
        }
    }

    public async operationToBlbs<T>(transferIdParam: number, transferUidParam: string): Promise<T>  {
        try {
            return await this.http.put<T>(`${this.restUrl}/api/oil-control/transfer/${transferUidParam}/toblps?transferId=${transferIdParam}`, null).toPromise();
        } catch (e) {
            console.error(e);
            return new Promise<T>(resolve => false);
        }
    }

    public async autoAssignShipments<T>(transferIdParam: number): Promise<T>  {
        try {
            return await this.http.put<T>(`${this.restUrl}/api/oil-control/transfer/${transferIdParam}/auto-relation`, null).toPromise();
        } catch (e) {
            console.error(e);
            return new Promise<T>(resolve => false);
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
