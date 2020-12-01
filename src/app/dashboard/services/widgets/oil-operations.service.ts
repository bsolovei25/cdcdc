import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDatesInterval, WidgetService } from '../widget.service';
import { AppConfigService } from '@core/service/app-config.service';
import {
    IOilShipment,
    IOilShipmentStatistics,
    IOilTransfer,
    OilOperationsShipmentType
} from '../../models/oil-operations';
import { IOilControlManualAdjEmitResponse } from '../../../widgets/NK/oil-operations/components/oil-operations-adjustment/oil-operations-adjustment.component';

export interface IOilOperationsOptions {
    dates?: { startTime: Date; endTime: Date };
    product?: string;
    group?: string;
    StartTime?: Date;
    EndTime?: Date;
    PassportId?: number;
    PassportName?: string;
    ProductId?: number;
    IsNotTransfer?: boolean;
    TransportTypesIds?: number[];
    TransferId?: number;
    TankId?: string;
    Ids?: number[];
    ProductName?: string;
    TankName?: string;
    Directions?: OilOperationsShipmentType[];
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
            return await this.http
                .get<IOilTransfer[]>(
                    this.restUrl +
                    `/api/oil-control/transfers?${this.getOptionString(lastId, options)}`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
            return new Promise<IOilTransfer[]>(resolve => []);
        }
    }

    public async getShipmentListByFilter(
        lastId: number,
        options: IOilOperationsOptions,
        batchSize: number = this.BATCH_SIZE,
    ): Promise<IOilShipment[]> {
        try {
            return await this.http
                .get<IOilShipment[]>(
                    this.restUrl +
                    `/api/oil-control/shipmentsbyfilter?${this.getOptionString(lastId, options, batchSize)}`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
            return new Promise<IOilShipment[]>(resolve => []);
        }
    }

    public async getShipmentStatistic(
        options: IOilOperationsOptions
    ): Promise<IOilShipmentStatistics> {

        try {
            return await this.http
                .get<IOilShipmentStatistics>(
                    this.restUrl +
                    `/api/oil-control/shipmentsbyfilter/statistics?${this.getOptionString(0, options)}`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
            return new Promise<IOilShipmentStatistics>(resolve => {});
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

    public async getFilterList<T>(filter: 'products' | 'groups' | 'tanks'): Promise<T>  {
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

    public async handleRelation(shipmentIdParam: number, transferIdParam: number, action: 'add-relation' | 'remove-relation' | 'recovery-relation'): Promise<IOilShipment | null>  {
        try {
            return await this.http.put<IOilShipment>(`${this.restUrl}/api/oil-control/shipment/${shipmentIdParam}/transfer/${transferIdParam}/${action}`, null).toPromise();
        } catch (e) {
            console.error(e);
            return new Promise<IOilShipment>(resolve => null);
        }
    }

    public async autoAssignShipments<T>(transferIdParam: number): Promise<T>  {
        try {
            return await this.http.put<T>(`${this.restUrl}/api/oil-control/shipments/transfer/${transferIdParam}/remove-relation-all`, null).toPromise();
        } catch (e) {
            console.error(e);
            return new Promise<T>(resolve => null);
        }
    }

    public async removeShipmentsRelationsByTransferId<T>(transferIdParam: number): Promise<T>  {
        try {
            return await this.http.put<T>(`${this.restUrl}/api/oil-control/transfer/${transferIdParam}/auto-relation`, null).toPromise();
        } catch (e) {
            console.error(e);
            return new Promise<T>(resolve => false);
        }
    }

    public async addShipmentsRelationsFromList<T>(idList: number[], transferIdParam: number): Promise<T>  {
        try {
            return await this.http.put<T>(`${this.restUrl}/api/oil-control/shipments/transfer/${transferIdParam}/add-relation-list`, idList).toPromise();
        } catch (e) {
            console.error(e);
            return new Promise<T>(resolve => false);
        }
    }

    public async getManualAdjustmentTypes<T>(): Promise<T>  {
        try {
            return await this.http.get<T>(`${this.restUrl}/api/oil-control/manual-adjustment-types`).toPromise();
        } catch (e) {
            console.error(e);
            return new Promise<T>(resolve => []);
        }
    }

    public async manualAdjustment<T>(
        transferIdParam: number,
        body: IOilControlManualAdjEmitResponse
        ): Promise<T>  {
        try {
            return await this.http.put<T>(`${this.restUrl}/api/oil-control/shipment/transfer/${transferIdParam}/add-manual`, body).toPromise();
        } catch (e) {
            console.error(e);
            return new Promise<T>(resolve => null);
        }
    }

    public async getFreeShipmentsProducts<T>(
        lastId: number,
        options: IOilOperationsOptions,
        batchSize: number,
    ): Promise<T[]> {
        try {
            return await this.http
                .get<T[]>(
                    this.restUrl +
                    `/api/oil-control/shipmentsbyfilter/products?StatisticType=product&${this.getOptionString(lastId, options, batchSize)}`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
            return new Promise<T[]>(resolve => []);
        }
    }

    public async getGroupsOfTanks<T>(): Promise<T[]> {
        try {
            return await this.http
                .get<T[]>(
                    this.restUrl +
                    `/api/oil-control/tanks/groups`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
            return new Promise<T[]>(resolve => []);
        }
    }

    public async getTanksByGroup<T>(idParam: number): Promise<T[]> {
        try {
            return await this.http
                .get<T[]>(
                    this.restUrl +
                    `/api/oil-control/tanks/${idParam}/bygroup`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
            return new Promise<T[]>(resolve => []);
        }
    }

    public async editTanksById<T>(idParam: string, stateParam: boolean): Promise<T> {
        try {
            return await this.http
                .put<T>(
                    this.restUrl +
                    `/api/oil-control/tank/${idParam}/enabled/${stateParam}`, null
                )
                .toPromise();
        } catch (error) {
            console.error(error);
            return new Promise<T>(resolve => null);
        }
    }

    public async getTankById<T>(idParam: string): Promise<T> {
        try {
            return await this.http
                .get<T>(
                    this.restUrl +
                    `/api/oil-control/tank/${idParam}`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
            return new Promise<T>(resolve => null);
        }
    }

    public async getTanksByFilter<T>(nameParam: string): Promise<T> {
        try {
            return await this.http
                .get<T>(
                    this.restUrl +
                    `/api/oil-control/tanksbyfilter?NameLike=${nameParam}`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
            return new Promise<T>(resolve => null);
        }
    }

    public async getTankMassChartData<T>(tankIdParam: string, startTime: Date, endTime: Date): Promise<T> {
        try {
            return await this.http
                .get<T>(
                    this.restUrl +
                    `/api/oil-control/tank/${tankIdParam}/graph/${startTime.toISOString()}/${endTime.toISOString()}`
                )
                .toPromise();
        } catch (error) {
            console.error(error);
            return new Promise<T>(resolve => null);
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

    private getOptionString(lastId: number, options: IOilOperationsOptions, batchSize: number = this.BATCH_SIZE): string {
        let res = `take=${batchSize}&lastId=${lastId}&`;
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
        if (options.StartTime) {
            res += `&StartTime=${options.StartTime.toISOString()}`;
        }
        if (options.EndTime) {
            res += `&EndTime=${options.EndTime.toISOString()}`;
        }
        if (options.PassportId) {
            res += `&PassportId=${options.PassportId}`;
        }
        if (options.PassportName) {
            res += `&PassportName=${options.PassportName}`;
        }
        if (options.ProductId) {
            res += `&ProductId=${options.ProductId}`;
        }
        if (options.IsNotTransfer) {
            res += `&IsNotTransfer=${options.IsNotTransfer}`;
        }
        if (options.TransferId) {
            res += `&TransferId=${options.TransferId}`;
        }
        if (options.TankId) {
            res += `&TankId=${options.TankId}`;
        }
        if (options.ProductName) {
            res += `&ProductName=${options.ProductName}`;
        }
        if (options.TankName) {
            res += `&TankName=${options.TankName}`;
        }
        if (options.TransportTypesIds?.length) {
            options.TransportTypesIds.forEach(id => {
                res += `&TransportTypesIds=${id}`;
            });
        }
        if (options.Directions?.length) {
            options.Directions.forEach(item => {
                res += `&Directions=${item}`;
            });
        }
        if (options.Ids?.length) {
            options.Ids.forEach(id => {
                res += `&Ids=${id}`;
            });
        }
        return res;
    }
}
